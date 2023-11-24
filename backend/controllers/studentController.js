const studentService = require("../services/studentService.js");

async function registerStudent(req, res) {
    try {
        const { StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate } = req.body;
        const student = await studentService.createStudent({ StudentId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate });
        res.status(201).json(student);
    }
    catch (error) {
        console.error("An error occurred while registering the student.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports=
{
    registerStudent
}