const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Course = models.course;

async function createCourse(courseData)
{
    try 
    {
        const course = await Course.create(courseData);
        return course;
    }
    catch (error)
    {
        console.error("Something went wrong with course creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createCourse
}