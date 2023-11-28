const staffService = require('../services/staffService.js');

async function registerStaffMember(req, res)
{
    try
    {
        const { FirstName, LastName, Sex, BirthDate, PhoneNo, Email, StaffType, ShiftType, Salary, CourseInfo, WorkingHour } = req.body;
        const staff = await staffService.createStaff({ FirstName, LastName, Sex, BirthDate, PhoneNo, Email, StaffType, ShiftType, Salary, CourseInfo, WorkingHour });
        res.status(201).json(staff);
    }
    catch (error)
    {
        console.error("An error occurred while registering the staff member.");
        res.status(500).json({ error: error.message });
    }
}

async function getAllStaff(req,res)
{
    try
    {
        const staffList = staffService.getAllStaff();
        res.status(200).json(staffList);
    }
    catch (error)
    {
        console.error("An error occurred while gathering the parent list.");
        res.status(500).json({ error: error.message });
    }
}

async function deleteStaffMember(req, res)
{
    try
    {
        const { StaffId } = req.body
        const staff = await staffService.deleteStaff({ StaffId });
        res.status(201).json(staff);  
    }
    catch (error)
    {
        console.error("An error occurred while registering the staff member.");
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerStaffMember,
    getAllStaff,
    deleteStaffMember
};