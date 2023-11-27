const course = require("../models/course.js");
const courseService = require("../services/courseService.js");

async function registerCourse(req, res) {
    try {
        const { CourseId, CourseName } = req.body;
        const course = await courseService.createCourse({ CourseId, CourseName });
        res.status(201).json(course);
    }
    catch (error) {
        console.error("An error occurred while registering the course.", error);
        res.status(500).json({ error: error.message });
    }
}

async function deleteCourse(req, res){
    try{
        const { CourseId, CourseName } = req.body;
        const course = await courseService.deleteCourse({ CourseId, CourseName });
        res.status(201).json("Course removed");
    }
    catch (error) {
        console.error("An error occurred while deleting the course.", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports=
{
    registerCourse,
    deleteCourse
}