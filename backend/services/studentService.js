const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Student = models.student;

async function createStudent(studentData)
{
    try 
    {
        const student = await Student.create(studentData);
        await ParentOf.create({ StudentId, ParentId });
        return student;
    }
    catch (error)
    {
        console.error("Something went wrong with student creation.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createStudent
}