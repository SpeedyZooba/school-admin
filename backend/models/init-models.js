var DataTypes = require("sequelize").DataTypes;
var _class_ = require("./class");
var _class_expense = require("./class_expense");
var _class_hours = require("./class_hours");
var _classroom = require("./classroom");
var _course = require("./course");
var _general_expense = require("./general_expense");
var _parent = require("./parent");
var _parent_of = require("./parent_of");
var _staff = require("./staff");
var _staff_working_hours = require("./staff_working_hours");
var _stocks = require("./stocks");
var _student = require("./student");
var _student_classes = require("./student_classes");
var _student_free_hours = require("./student_free_hours");
var _teaches_class = require("./teaches_class");

function initModels(sequelize) {
  var class_ = _class_(sequelize, DataTypes);
  var class_expense = _class_expense(sequelize, DataTypes);
  var class_hours = _class_hours(sequelize, DataTypes);
  var classroom = _classroom(sequelize, DataTypes);
  var course = _course(sequelize, DataTypes);
  var general_expense = _general_expense(sequelize, DataTypes);
  var parent = _parent(sequelize, DataTypes);
  var parent_of = _parent_of(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var staff_working_hours = _staff_working_hours(sequelize, DataTypes);
  var stocks = _stocks(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var student_classes = _student_classes(sequelize, DataTypes);
  var student_free_hours = _student_free_hours(sequelize, DataTypes);
  var teaches_class = _teaches_class(sequelize, DataTypes);

  class.belongsToMany(class, { as: 'CourseId_classes', through: class_expense, foreignKey: "SectionId", otherKey: "CourseId" });
  class.belongsToMany(class, { as: 'SectionId_classes', through: class_expense, foreignKey: "CourseId", otherKey: "SectionId" });
  class.belongsToMany(class, { as: 'CourseId_class_class_hours', through: class_hours, foreignKey: "SectionId", otherKey: "CourseId" });
  class.belongsToMany(class, { as: 'SectionId_class_class_hours', through: class_hours, foreignKey: "CourseId", otherKey: "SectionId" });
  course.belongsToMany(staff, { as: 'StaffId_staffs', through: teaches_class, foreignKey: "CourseId", otherKey: "StaffId" });
  parent.belongsToMany(student, { as: 'StudentId_students', through: parent_of, foreignKey: "ParentId", otherKey: "StudentId" });
  staff.belongsToMany(course, { as: 'CourseId_courses', through: teaches_class, foreignKey: "StaffId", otherKey: "CourseId" });
  student.belongsToMany(parent, { as: 'ParentId_parents', through: parent_of, foreignKey: "StudentId", otherKey: "ParentId" });
  class_expense.belongsTo(class, { as: "Section", foreignKey: "SectionId"});
  class.hasMany(class_expense, { as: "class_expenses", foreignKey: "SectionId"});
  class_expense.belongsTo(class, { as: "Course", foreignKey: "CourseId"});
  class.hasMany(class_expense, { as: "Course_class_expenses", foreignKey: "CourseId"});
  class_hours.belongsTo(class, { as: "Section", foreignKey: "SectionId"});
  class.hasMany(class_hours, { as: "class_hours", foreignKey: "SectionId"});
  class_hours.belongsTo(class, { as: "Course", foreignKey: "CourseId"});
  class.hasMany(class_hours, { as: "Course_class_hours", foreignKey: "CourseId"});
  student_classes.belongsTo(class, { as: "Section", foreignKey: "SectionId"});
  class.hasMany(student_classes, { as: "student_classes", foreignKey: "SectionId"});
  student_classes.belongsTo(class, { as: "Course", foreignKey: "CourseId"});
  class.hasMany(student_classes, { as: "Course_student_classes", foreignKey: "CourseId"});
  class.belongsTo(classroom, { as: "Room", foreignKey: "RoomId"});
  classroom.hasMany(class, { as: "classes", foreignKey: "RoomId"});
  class.belongsTo(course, { as: "Course", foreignKey: "CourseId"});
  course.hasMany(class, { as: "classes", foreignKey: "CourseId"});
  teaches_class.belongsTo(course, { as: "Course", foreignKey: "CourseId"});
  course.hasMany(teaches_class, { as: "teaches_classes", foreignKey: "CourseId"});
  parent_of.belongsTo(parent, { as: "Parent", foreignKey: "ParentId"});
  parent.hasMany(parent_of, { as: "parent_ofs", foreignKey: "ParentId"});
  class.belongsTo(staff, { as: "Teacher", foreignKey: "TeacherId"});
  staff.hasMany(class, { as: "classes", foreignKey: "TeacherId"});
  staff_working_hours.belongsTo(staff, { as: "Staff", foreignKey: "StaffId"});
  staff.hasMany(staff_working_hours, { as: "staff_working_hours", foreignKey: "StaffId"});
  teaches_class.belongsTo(staff, { as: "Staff", foreignKey: "StaffId"});
  staff.hasMany(teaches_class, { as: "teaches_classes", foreignKey: "StaffId"});
  parent_of.belongsTo(student, { as: "Student", foreignKey: "StudentId"});
  student.hasMany(parent_of, { as: "parent_ofs", foreignKey: "StudentId"});
  student_classes.belongsTo(student, { as: "Student", foreignKey: "StudentId"});
  student.hasMany(student_classes, { as: "student_classes", foreignKey: "StudentId"});
  student_free_hours.belongsTo(student, { as: "Student", foreignKey: "StudentId"});
  student.hasMany(student_free_hours, { as: "student_free_hours", foreignKey: "StudentId"});

  return {
    class_,
    class_expense,
    class_hours,
    classroom,
    course,
    general_expense,
    parent,
    parent_of,
    staff,
    staff_working_hours,
    stocks,
    student,
    student_classes,
    student_free_hours,
    teaches_class,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
