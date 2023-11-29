const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classroom_hours', {
    ClassroomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classroom',
        key: 'RoomId'
      }
    },
    ClassDay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ClassHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'class',
        key: 'CourseId'
      }
    },
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'class',
        key: 'SectionId'
      }
    }
  }, {
    sequelize,
    tableName: 'classroom_hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ClassroomId" },
          { name: "ClassDay" },
          { name: "ClassHour" },
        ]
      },
      {
        name: "CourseId",
        using: "BTREE",
        fields: [
          { name: "CourseId" },
          { name: "SectionId" },
        ]
      },
    ]
  });
};
