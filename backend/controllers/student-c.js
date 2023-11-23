const db = require("../models/student");
const student = db.students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Request validation
  if (!req.body.title) {
    res.status(400).send({
      message: "Content not found."
    });
    return;
  }

  // Student creation
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

  // Saving the new entry
  student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the student entry."
      });
    });
};

exports.findAll = (req, res) => {
    student.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while attempting to retrive the students."
        });
      });
};

exports.findAllActive = (req, res) => {
    student.findAll({ where: { IsActive: true }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while attempting to retrive active students."
      });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    student.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Student with id=${id} could not be found.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while attempting to retrive the student with the id " + id
        })
      })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({ where: { id: id } })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student entry deleted successfully."
          });
        } else {
          res.send({
            message: `Failed deleting the student with id=${id}. Possibly empty entry.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while attempting to delete the student with the id " + id
        });
      });
};

exports.deleteAll = (req, res) => {
  
};