const sequelize = require('../seqConfig.js');
const initModels = require('../models/init-models.js');
const StudentHourService = require('../services/studentHourService.js');

const models = initModels(sequelize);
const Student = models.student;
const ParentOf = models.parent_of;

async function createStudent(studentData, parentId)
{
    try 
    {
        const student = await Student.create(studentData);
        const studentId = student.StudentId;
        await ParentOf.create({ StudentId: studentId, ParentId: parentId });
        await StudentHourService.createFreeHour(studentId, studentData.FreeHour);
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

async function getAllStudent()
{
    try
    {
        const studentList = Student.findAll();
        return studentList;
    }
    catch (error)
    {
        console.error("Something went wrong while gathering student list.", error);
        throw new Error("Something went wrong.");
    }
}

module.exports=
{
    createStudent,
    deleteStudent,
    getAllStudent
}