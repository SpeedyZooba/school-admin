module.exports = app => {
    const students = require("../controllers/student-c.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/students", students.create);
  
    // Retrieve all students
    router.get("/students", students.findAll);
  
    // Retrieve all published students
    router.get("/published", students.findAllPublished);
  
    // Retrieve a single student with id
    router.get("/:StudentId", students.findOne);

    // Retrieve a single student with Fname
    router.get("/:FirstName", students.findOne);
  
    // Update a student with id
    router.put("/:StudentId", students.update);
  
    // Delete a student with id
    router.delete("/:StudentId", students.delete);
  
    // Delete all students
    router.delete("/", students.deleteAll);
  
    app.use('/api/students', router);
  };