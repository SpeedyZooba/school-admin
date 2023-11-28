const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');
const student = require('../models/student.js');

const models = initModels(sequelize);
const StudentHour = models.student_free_hours;

async function createFreeHour(studentId, hourData)
{
    try
    {
        const hourArray = hourData.FreeHour.split(',').map(item => item.trim());
        const hourList = await Promise.all(
            hourArray.map(async (item, index) => {
                const [MorningStatus, NoonStatus] = item.split("-").map(Number);
                const day = mapDay(index);
                return await StudentHour.create({ StudentId: studentId, ReservedDay: day, FreeHourMorning: MorningStatus, FreeHourAfternoon: NoonStatus });
            })
        );
        return hourList;
    }
    catch (error)
    {
        console.error("Something went wrong while creating free hour.", error);
        throw new Error("Something went wrong while creating free hour.");
    }
}

async function deleteFreeHourForStudent(studentId)
{
    try
    {
        const hour = await StudentHour.destroy({ where: { StudentId: studentId.StudentId } });
        return hour;
    }
    catch (error)
    {
        console.error("Something went wrong while deleting free hour.", error);
        throw new Error("Something went wrong while creating free hour.");
    }
}

async function updateFreeHourForStudent(studentId, hourData)
{
    const hourArray = hourData.split(',').map(item => item.trim());
    const hourList = await Promise.all(
        hourArray.map(async (item, index) => {
            const id = studentId.StudentId;
            const [MorningStatus, NoonStatus] = item.split("-").map(Number);
            const day = mapDay(index);
            return await StudentHour.update({ FreeHourMorning: MorningStatus, FreeHourAfternoon: NoonStatus }, {where: { StudentId: id, ReservedDay: day } });
        })
    );
    return hourList;
}

function mapDay(index)
{
    const daysOfWeek = ['Pzt', 'Sal', 'Car', 'Prs', 'Cum'];
    return daysOfWeek[index];
}

module.exports = {
    createFreeHour,
    deleteFreeHourForStudent,
    updateFreeHourForStudent,
    mapDay
};