const { Student } = require("../models/student.js");
const { ParentOf } = require("../models/parent_of.js");

async function createStudent(StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentId)
{
    try 
    {
        const student = await Student.create({ StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentId });
        await ParentOf.create({ StudentId, ParentId });
        return student;
    }
    catch (error)
    {
        console.error("Something went wrong with student creation.", error);
        throw new Error("Something went wrong.");
    }
}

async function getAllStudents()
{
    try 
    {
        const students = await Student.findAll();
        return students;
    }
    catch (error)
    {
        console.error("Something went wrong with whole student fetching.", error);
        throw new Error("Something went wrong.");
    }
}

async function getActiveStudents()
{
    try
    {
        const students = await Student.findAll({ where: { IsActive: true } });
        return students;
    }
    catch (error)
    {
        console.error("Something went wrong with active student fetching.", error);
        throw new Error("Something went wrong.");
    }
}

async function graduateStudent(id)
{
    try
    {
        await Student.update({ IsActive: true }, { where: { id } });
        return "success";
    }
    catch (error)
    {
        console.error("Something went wrong with student graduation.", error);
        throw new Error("Something went wrong.");
    }
}

async function updateStudent(id, newData)
{
    try
    {
        await Student.update(newData, { where: { id } });
        return "success";
    }
    catch (error)
    {
        console.error("Something went wrong with student update.", error);
        throw new Error("Something went wrong.");
    }
}

async function deleteStudent(id)
{
    try
    {
        await ParentOf.destroy({ where: { StudentId: id }});
        await Student.destroy({ where: { id } });
        return "success";
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
    getAllStudents,
    getActiveStudents,
    graduateStudent,
    updateStudent,
    deleteStudent
}