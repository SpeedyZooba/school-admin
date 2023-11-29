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
        res.status(200).json(workingHours);
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
    for (let i = 0 ; i< workingHours.length ; i++){
        for (let n = 0; n<classHours.length ; n++){
            if(workingHours[i]===classHours[n]){
                break;
            }
            else{
                dummy[i]=workingHours[i]; 
            }
        }
    }
    return dummy;

}

module.exports = {
    getFreeHoursForTeacher
}