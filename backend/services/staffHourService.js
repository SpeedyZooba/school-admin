const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const StaffHour = models.staff_working_hours;

async function createWorkingHour(staffId, hourData)
{
    try
    {
        const hourArray = hourData.split(',').map(item => item.trim());
        const hourList = await Promise.all(
            hourArray.map(async (item, index) => {
                const StaffHours = item.split("-").map(Number);
                const day = mapDay(index);
                for(let i = 0; i < StaffHours.length; i++){
                    await StaffHour.create({ StaffId: staffId, ReservedDay: day, StaffHour: StaffHours[i]});
                }
                    
            })
        );
        return hourList;
    }
    catch (error)
    {
        console.error("Something went wrong while creating staff hour.", error);
        throw new Error("Something went wrong while creating staff hour.");
    }
}

async function deleteWorkingHourForStaff(staffId)
{
    try
    {
        const hour = StaffHour.destroy({ where: { StaffId: staffId.StaffId } });
        return hour;
    }
    catch (error)
    {
        console.error("Something went wrong while deleting staff hour.", error);
        throw new Error("Something went wrong while deleting staff hour.");
    }
}

async function getWorkingHoursById(staffId)
{
    try
    {
        const workingHours = await StaffHour.findAll({
            attributes: ['ReservedDay', 'StaffHour'],
            where: {
                StaffId: staffId
            },
        });
        return workingHours;
    }
    catch (error)
    {
        console.error("Something went wrong while fetching staff hour.", error);
        throw new Error("Something went wrong while fetching staff hour.");
    }
}

async function getFreeHoursByTeacherId(teacherId)
{
    try 
    {
        const query = `
        WITH TEACHER_SCHEDULE AS (
            SELECT
            CLASS.TeacherId AS TeacherId,
                CLASS_HOURS.ReservedDay AS BusyDay,
                CLASS_HOURS.ReservedHour AS BusyHour
            FROM
                CLASS
            INNER JOIN
                CLASS_HOURS ON CLASS_HOURS.SectionId = CLASS.SectionId AND CLASS_HOURS.CourseId = CLASS.CourseId
        )
        SELECT
            STAFF_WORKING_HOURS.ReservedDay AS FreeDay,
            STAFF_WORKING_HOURS.StaffHour AS FreeHour
        FROM
            STAFF
        INNER JOIN
            STAFF_WORKING_HOURS ON STAFF.StaffId = STAFF_WORKING_HOURS.StaffId
        WHERE NOT EXISTS (
            SELECT 
                1
            FROM 
                TEACHER_SCHEDULE
            WHERE 
                STAFF_WORKING_HOURS.ReservedDay = TEACHER_SCHEDULE.BusyDay AND STAFF_WORKING_HOURS.StaffHour = TEACHER_SCHEDULE.BusyHour
                AND STAFF.StaffId = TEACHER_SCHEDULE.TeacherId
            )
            AND STAFF.StaffId = :staffId;
        `;
    
        const [results] = await sequelize.query(query, {
            replacements: { staffId: teacherId },
            type: sequelize.QueryTypes.SELECT,
        });
    
        return results;
    } 
    catch (error) 
    {
        console.error('Error:', error);
        throw new Error('Error fetching class hours for teacher.');
    }
}

function mapDay(index)
{
    const daysOfWeek = ['Pzt', 'Sal', 'Car', 'Prs', 'Cum'];
    return daysOfWeek[index];
}

module.exports = {
    createWorkingHour,
    deleteWorkingHourForStaff,
    getWorkingHoursById,
    getFreeHoursByTeacherId,
    mapDay
};