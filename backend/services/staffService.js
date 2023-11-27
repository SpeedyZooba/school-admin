const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');
const TeachesClassService = require('../services/teachesClassService.js');
const StaffHourService = require('../services/staffHourService.js');

const models = initModels(sequelize);
const Staff = models.staff;

async function createStaff(staffData, staffId, courseData, hourData)
{
    try
    {
        const staff = await Staff.create(staffData);
        await StaffHourService.createWorkingHour(staffId, hourData);
        if (courseData ?? false)
        {
            await TeachesClassService.createTeacherClassLink(staffId, courseData);
        }
        return staff;
    }
    catch (error)
    {
        console.error("Something went wrong with staff creation.", error);
        throw new Error("Something went wrong with staff creation.");
    }
}

async function deleteStaff(staffId)
{
    try
    {
        const staff = await Staff.destroy({ where: { StaffId: staffId.StaffId } });
        return staff;
    }
    catch (error)
    {
        console.error("Something went wrong with staff deletion.", error);
        throw new Error("Something went wrong with staff deletion.");
    }
}

module.exports = {
    createStaff,
    deleteStaff
};