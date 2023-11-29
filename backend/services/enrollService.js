const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Enroll = models.Enroll;

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
            ENROLL.CourseId = :courseId AND STUDENT_FREE_HOURS.ReservedDay = :freeDay AND STUDENT_FREE_HOURS.StudentHour = :freeHour`;
    
        const [results] = await sequelize.query(query, {
            replacements: { courseId, freeDay, freeHour },
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
    
        const [results] = await sequelize.query(query, {
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
    getEnrolledCourses
}