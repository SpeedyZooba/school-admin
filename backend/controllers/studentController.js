const studentService = require("../services/studentService.js");
const parentService = require("../services/parentService.js");

async function registerStudent(req, res) {
    try {
        const { FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentPhoneNumber, FreeHour } = req.body;
        const ParentId = await parentService.fetchParentIdByPhone({ ParentPhoneNumber });
        const student = await studentService.createStudent({ FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, FreeHour }, ParentId);
        res.status(201).json(student);
    }
    catch (error) {
        console.error("An error occurred while registering the student.", error);
        res.status(500).json({ error: error.message });
    }

    async function getAllStudent(req,res) {
        try {
            const studentList = await studentService.getAllStudent()
            res.status(200).json(studentList);
        }
        catch (error) {
            console.error("Something went wrong while gathering student list.", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports=
{
    registerStudent,
    getAllStudent
}