const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_hours', {
    ReservedDay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ReservedHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'class_hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ReservedDay" },
          { name: "ReservedHour" },
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
