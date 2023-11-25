const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');
const teachesClassService = require('../services/teachesClassService.js');

const models = initModels(sequelize);
const Staff = models.staff;

async function createStaff(staffData, staffId, courseData)
{
    try
    {
        const staff = Staff.create(staffData);
        if (courseData ?? false)
        {
            const courseArray = courseData.CourseInfo.split(',').map(item => parseInt(item.trim(), 10));
            try
            {
                const courseList = await Promise.all(
                    courseArray.map(async item => {
                        const teacherId = staffId.StaffId;
                        return await teachesClassService.createTeacherClassLink({ StaffId: teacherId, CourseId: item });
                    })
                );
                return courseList;
            }
            catch (error)
            {
                console.error("Something went wrong with teacher creation.", error);
                throw new Error("Something went wrong with teacher creation.");
            }
        }
        return staff;
    }
    catch (error)
    {
        console.error("Something went wrong with staff creation.", error);
        throw new Error("Something went wrong with staff creation.");
    }
}

module.exports = {
    createStaff
};