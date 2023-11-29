const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const TeachesClass = models.teaches_class;
const Course = models.course;

async function createTeacherClassLink(staffId, courseData)
{
    try
    {
        let course = await Course.findOne({ where: { CourseName: courseData } });
        
        if (course === null)
        {
            course = await Course.create({ CourseName: courseData });
        }
        return await TeachesClass.create({ StaffId: staffId, CourseId: course.CourseId });
    }
    catch (error)
    {
        console.error("Something went wrong while establishing the link.", error);
        throw new Error("Something went wrong while establishing the link.");
    }
}

async function getTeacherIdByCourseId(courseId)
{
    try 
    {
        const courseLink = await TeachesClass.findOne({ where: { CourseId: courseId } });
        console.log(courseLink);
        if (courseLink !== null)
        {
            return courseLink.StaffId;
        }
        else
        {
            return null;
        }
    }
    catch (error)
    {
        console.error("Something went wrong while fetching the course link.", error);
        throw new Error("Something went wrong while fetching the course link.");
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
    deleteAllLinksForCourse,
    getTeacherIdByCourseId
};