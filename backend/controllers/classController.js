const classHoursService = require('../services/classHoursService.js');
const staffHourService = require('../services/staffHourService.js');

async function getFreeHoursForTeacher(req, res)
{
    try
    {
        const { TeacherId } = req.body;
        console.log(TeacherId);
        const workingHours = await staffHourService.getWorkingHoursById(TeacherId);
        const classHour = await classHoursService.getClassHoursByTeacherId(TeacherId);
        const freeHour = findHourDifference(classHour, workingHours)
        res.status(200).json(freeHour);
    }
    catch (error)
    {
        console.error("Error", error);
        res.status(500).json({ error: error.message });
    }
}

function findHourDifference(classHours, workingHours)
{
    let dummy = [];
    for (let i = 0 ; i< workingHours.length ; i++)
    {
            if(workingHours[i].ReservedDay===classHours.ReservedDay && workingHours[i].StaffHour===classHours.StaffHour)
            {
                break;
            }
            else
            {
                dummy.push(workingHours[i]); 
            }
    }
    return dummy;

}

module.exports = {
    getFreeHoursForTeacher,
    findHourDifference
}