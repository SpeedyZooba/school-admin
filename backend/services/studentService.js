const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Student = models.student;

async function createStudent(StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate)
{
    try 
    {
        const student = await Student.create({ StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate});
        //await ParentOf.create({ StudentId, ParentId });
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