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
                const [MorningStatus, NoonStatus] = item.split("-").map(Number);
                const day = mapDay(index);
                return await StaffHour.create({ StaffId: staffId, ReservedDay: day, FreeHourMorning: MorningStatus, FreeHourAfternoon: NoonStatus });
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

function mapDay(index)
{
    const daysOfWeek = ['Pzt', 'Sal', 'Car', 'Prs', 'Cum'];
    return daysOfWeek[index];
}

module.exports = {
    createWorkingHour,
    deleteWorkingHourForStaff,
    mapDay
};