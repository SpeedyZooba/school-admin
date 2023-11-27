const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');

const models = initModels(sequelize);
const Student = models.student;
const ParentOf = models.parent_of;

async function createStudent(studentData, parentOfData)
{
    try 
    {
        const student = await Student.create(studentData);
        await ParentOf.create(parentOfData);
        return student;
    }
    catch (error)
    {
        console.error("Something went wrong with student creation.", error);
        throw new Error("Something went wrong.");
    }
}

async function deleteStudent(studentId)
{
    try
    {
        const student = Student.destroy({ where: { StudentId: studentId.StudentId } });
        return student;
    }
    catch (error)
    {
        console.error("Something went wrong with student deletion.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createStudent,
    deleteStudent
}