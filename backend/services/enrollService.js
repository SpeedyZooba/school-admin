const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Enroll = models.enroll;

async function getAvailableEnrollments(courseId, freeDay, freeHour)
{
    try 
    {
        const query = `
        SELECT
	        ENROLL.StudentId,
	        STUDENT_FREE_HOURS.ReservedDay AS FreeDay,
	        STUDENT_FREE_HOURS.StudentHour AS FreeHour
        FROM
	        ENROLL
        LEFT JOIN
	        STUDENT_FREE_HOURS ON STUDENT_FREE_HOURS.StudentId = ENROLL.StudentId 
        WHERE
            ENROLL.CourseId = :CourseId AND STUDENT_FREE_HOURS.ReservedDay = :FreeDay AND STUDENT_FREE_HOURS.StudentHour = :FreeHour;`;
    
        const results = await sequelize.query(query, {
            replacements: { CourseId: courseId, FreeDay: freeDay, FreeHour: freeHour},
            type: sequelize.QueryTypes.SELECT,
        });
        results.forEach(result => {
            console.log(result);
        });
        return results;
    } 
    catch (error) 
    {
        console.error('Error:', error);
        throw new Error('Error fetching class hours for teacher.');
    }
}

async function completeEnroll(studentId, courseId)
{
    try
    {
        const enrolled = await Enroll.destroy({ where: { StudentId: studentId, CourseId: courseId } });
        return enrolled;
    }
    catch (error)
    {
        console.error('Error:', error);
        throw new Error('Error fetching class hours for teacher.');
    }
}

async function getEnrolledCourses()
{
    try 
    {
        const query = `
        SELECT 
            CourseId, COUNT(StudentId) AS TotalEnrollment
        FROM
            ENROLL
        GROUP BY
            CourseId
        ORDER BY
            TotalEnrollment DESC;
        `;
    
        const results = await sequelize.query(query, {
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
    getAvailableEnrollments,
    getEnrolledCourses,
    completeEnroll
}