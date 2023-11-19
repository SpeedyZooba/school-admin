const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_', {
    SectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course',
        key: 'CourseId'
      }
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classroom',
        key: 'RoomId'
      }
    },
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'StaffId'
      }
    }
  }, {
    sequelize,
    tableName: 'class',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SectionId" },
          { name: "CourseId" },
        ]
      },
      {
        name: "CourseId",
        using: "BTREE",
        fields: [
          { name: "CourseId" },
        ]
      },
      {
        name: "TeacherId",
        using: "BTREE",
        fields: [
          { name: "TeacherId" },
        ]
      },
      {
        name: "RoomId",
        using: "BTREE",
        fields: [
          { name: "RoomId" },
        ]
      },
    ]
  });
};
