const { StudentService } = require("../services/studentService");

async function registerStudent(req, res)
{
    try
    {
        const { StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentId } = req.body;
        const student = await StudentService.createStudent({ StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentId });
        res.status(201).json(student);
    }
    catch (error)
    {
        console.error("An error occurred while registering the student.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getAllStudents(req, res)
{
    try
    {
        const students = await StudentService.getAllStudents();
        res.status(200).json(students);
    }
    catch (error)
    {
        console.error("An error occurred while fetching all students.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getNonGradStudents(req, res)
{
    try
    {
        const students = await StudentService.getActiveStudents();
        res.status(200).json(students);
    }
    catch (error)
    {
        console.error("An error occurred while fetching active students.", error);
        res.status(500).json({ error: error.message });
    }
}

async function updateStudentInfo(req, res)
{
    const studentId = req.params.id;
    const newInfo = req.body;
    try
    {
        const result = await StudentService.updateStudent(studentId, newInfo);
        res.json({ message: result });
    }
    catch (error)
    {
        console.error("An error occurred while updating student information.", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteStudent(req, res)
{
    const studentId = req.params.id;
    try
    {
        const result = await StudentService.deleteStudent(studentId);
        res.json({ message: result });
    }
    catch (error)
    {
        console.error("An error occurred while deleting student information.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports
{
    registerStudent,
    getAllStudents,
    getNonGradStudents,
    updateStudentInfo,
    deleteStudent
}