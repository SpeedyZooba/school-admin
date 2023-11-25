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

module.exports = { registerClassroom }