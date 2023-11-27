const studentService = require("../services/studentService.js");
const parentService = require("../services/parentService.js");

async function registerStudent(req, res) {
    try {
        const { FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate, ParentPhoneNumber } = req.body;
        const ParentId = parentService.fetchParentIdByPhone({ ParentPhoneNumber });
        const student = await studentService.createStudent({ FirstName, LastName, Sex, BirthDate, PhoneNo, Email, IsActive, GradDate }, { ParentId });
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