const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const TeachesClass = models.teaches_class;

async function createTeacherClassLink(staffId, courseData)
{
    try
    {
        const courseArray = courseData.CourseInfo.split(',').map(item => parseInt(item.trim(), 10));
        const courseList = await Promise.all(
            courseArray.map(async item => {
                const teacherId = staffId.StaffId;
                return await TeachesClass.create({ StaffId: teacherId, CourseId: item });
            })
        );
        return courseList;
    }
    catch (error)
    {
        console.error("Something went wrong while establishing the link.", error);
        throw new Error("Something went wrong while establishing the link.");
    }
}

async function deleteTeacherClassLink(linkData)
{
    try 
    {
        const classLink = await TeachesClass.destroy({ where: { StaffId: linkData.StaffId, CourseId: linkData.CourseId } });
        return classLink;
    }
    catch (error)
    {
        console.error("Something went wrong while deleting the link.", error);
        throw new Error("Something went wrong while deleting the link.");
    }
}

async function deleteAllLinksForTeacher(staffId)
{
    try
    {
        const classLinks = await TeachesClass.destroy({ where: { StaffId: staffId.StaffId } });
        return classLinks;
    }
    catch (error)
    {
        console.error("Something happened while deleting the links.", error);
        throw new Error("Something went wrong while deleting the link.");
    }
}

async function deleteAllLinksForCourse(courseId)
{
    try
    {
        const courseLinks = await TeachesClass.destroy({ where : { CourseId: courseId.CourseId } });
        return courseLinks;
    }
    catch (error)
    {
        console.error("Something happened while deleting the links.", error);
        throw new Error("Something went wrong while deleting the link.");
    }
}

module.exports = {
    createTeacherClassLink,
    deleteTeacherClassLink,
    deleteAllLinksForTeacher,
    deleteAllLinksForCourse
};