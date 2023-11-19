const db = require("../models/student");
const student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Student
  const student = {
    StudentId: req.body.StudentId,  
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Sex: req.body.Sex,
    BirthDate: req.body.BirthDate,
    PhoneNo: req.body.PhoneNo,
    Email: req.body.Email,
    IsActive: req.body.IsActive,
    GradDate: req.body.GradDate,
  };

  // Save Tutorial in the database
  student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    });
};

// Retrieve all Student with specific Fname from the database.
exports.findAll = (req, res) => {
        
    student.findAll({ where: {} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};