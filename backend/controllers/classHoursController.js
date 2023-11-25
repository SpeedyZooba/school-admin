const classHoursService = require("../services/classHoursService.js");

async function registerClassHours(req, res) {
    try {
        const { ReservedDay, ReservedHour, SectionId, CourseId } = req.body;
        const classHours = await classHoursService.createClassHours({ ReservedDay, ReservedHour, SectionId, CourseId });
        res.status(201).json(classHours);
    }
    catch (error) {
        console.error("An error occurred while registering the classhours.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { registerClassHours }