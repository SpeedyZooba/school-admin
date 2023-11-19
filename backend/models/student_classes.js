const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_classes', {
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'StudentId'
      }
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'class',
        key: 'SectionId'
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'class',
        key: 'CourseId'
      }
    }
  }, {
    sequelize,
    tableName: 'student_classes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StudentId" },
          { name: "SectionId" },
          { name: "CourseId" },
        ]
      },
      {
        name: "SectionId",
        using: "BTREE",
        fields: [
          { name: "SectionId" },
        ]
      },
      {
        name: "CourseId",
        using: "BTREE",
        fields: [
          { name: "CourseId" },
        ]
      },
    ]
  });
};
