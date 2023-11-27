const staffService = require('../services/staffService.js');

async function registerStaffMember(req, res)
{
    try
    {
        const { StaffId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, StaffType, ShiftType, Salary, CourseInfo, WorkingHour } = req.body;
        const staff = await staffService.createStaff({ StaffId, FirstName, LastName, Sex, BirthDate, PhoneNo, Email, StaffType, ShiftType, Salary }, { StaffId }, { CourseInfo }, { WorkingHour });
        res.status(201).json(staff);
    }
    catch (error)
    {
        console.error("An error occurred while registering the staff member.");
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
    deleteStaffMember
};