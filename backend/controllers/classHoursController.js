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

async function getClassHours(req, res) {
    try {
        const classHours = await classHoursService.findAllClassHours();
        res.status(201).json(classHours);
    }
    catch (error) {
        console.error("An error occurred while getting the classHours.", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteClassHours(req, res) {
    try {
        const { ReservedDay, ReservedHour, SectionId, CourseId } = req.body;
        const classHours = await classHoursService.deleteClassHours({ ReservedDay, ReservedHour, SectionId, CourseId });
        res.status(201).json(classHours);
    }
    catch (error) {
        console.error("An error occurred while deleting the classHours.", error);
        res.status(500).json({ error: error.message });
    }
}

async function updateClassHours(req, res) {
    try {
        const { ReservedDayOld, ReservedHourOld, SectionIdOld, CourseIdOld, ReservedDayNew, ReservedHourNew, SectionIdNew, CourseIdNew } = req.body;
        const classHours = await classHoursService.updateClassHours({ ReservedDayOld, ReservedHourOld, SectionIdOld, CourseIdOld }, { ReservedDayNew, ReservedHourNew, SectionIdNew, CourseIdNew });
        res.status(201).json(classHours);
    }
    catch (error) {
        console.error("An error occurred while updatating the classHours.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    registerClassHours,
    getClassHours,
    deleteClassHours,
    updateClassHours
 }