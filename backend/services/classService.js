const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Classes = models.class_;

async function createClass(classData)
{
    try
    {
        const newClass = await Classes.create(classData);
        return newClass;
    }
    catch (error)
    {
        console.error("Something happened during class creation.", error);
        throw new Error("Something happened during class creation.");
    }
}

async function getClassroomTimes(classroomId)
{
    try 
    {
        const query = `
        SELECT
            CLASSROOM_HOURS.ClassHour AS ClassHour,
            CLASSROOM_HOURS.ClassDay AS ClassDay,
            COURSE.CourseName AS CourseName,
            CLASSROOM_HOURS.SectionId AS SectionId
        FROM
            CLASSROOM_HOURS
        RIGHT JOIN
            COURSE ON CLASSROOM_HOURS.CourseId = COURSE.CourseId
        WHERE
            CLASSROOM_HOURS.ClassroomId = :roomId;
        `;
    
        const [results] = await sequelize.query(query, {
            replacements: { roomId: classroomId },
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

async function getStudentTimes(studentId)
{
    try 
    {
        const query = `
        SELECT
            CLASS_HOURS.ReservedHour AS ClassHour,
            CLASS_HOURS.ReservedDay AS ClassDay,
            COURSE.CourseName AS CourseName,
            CLASS_HOURS.SectionId AS SectionId
        FROM 
            CLASS_HOURS
        RIGHT JOIN
            STUDENT_CLASSES ON CLASS_HOURS.CourseId = STUDENT_CLASSES.CourseId AND CLASS_HOURS.SectionId = STUDENT_CLASSES.SectionId
        LEFT JOIN
            COURSE ON STUDENT_CLASSES.CourseId = COURSE.CourseId
        WHERE
            STUDENT_CLASSES.StudentId = :studentId;
        `;
    
        const [results] = await sequelize.query(query, {
            replacements: { studentId },
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

async function getTeacherTimes(teacherId)
{
    try
    {
        const query = `
        SELECT
            CLASS.TeacherId,
            CLASS_HOURS.ReservedHour AS ClassHour,
            CLASS_HOURS.ReservedDay AS ClassDay,
            COURSE.CourseName AS CourseName,
            CLASS.SectionId AS SectionId
        FROM
            CLASS
        LEFT JOIN
            CLASS_HOURS ON CLASS_HOURS.SectionId = CLASS.SectionId AND CLASS_HOURS.CourseId = CLASS.CourseId
        LEFT JOIN
            COURSE ON COURSE.CourseId = CLASS.CourseId
        WHERE 
            CLASS.TeacherId = :teacherId;
        `;

        const [results] = await sequelize.query(query, {
            replacements: { teacherId },
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

module.exports = {
    createClass,
    getClassroomTimes,
    getStudentTimes,
    getTeacherTimes

}