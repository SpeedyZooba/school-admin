const classroomService = require("../services/classroomService.js");

async function registerClassroom(req, res) {
    try {
        const { RoomId, Capacity } = req.body;
        const classroom = await classroomService.createClassroom({ RoomId, Capacity });
        res.status(201).json(classroom);
    }
    catch (error) {
        console.error("An error occurred while registering the classroom.", error);
        res.status(500).json({ error: error.message });
    }
}

async function getClassroom(req, res) {
    try {
        const classroom = await classroomService.findAllClassroom();
        res.status(201).json(classroom);
    }
    catch (error) {
        console.error("An error occurred while getting the classroom.", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteClassroom(req, res) {
    try {
        const { RoomId } = req.body;
        const classroom = await classroomService.deleteClassroom({ RoomId });
        res.status(201).json(classroom);
    }
    catch (error) {
        console.error("An error occurred while deleting the classroom.", error);
        res.status(500).json({ error: error.message });
    }
}

async function updateClassroom(req, res) {
    try {
        const { RoomId, Capacity } = req.body;
        const classroom = await classroomService.updateClassroom({ RoomId, Capacity });
        res.status(201).json(classroom);
    }
    catch (error) {
        console.error("An error occurred while updatating the classroom.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    registerClassroom,
    getClassroom,
    deleteClassroom,
    updateClassroom
 }
