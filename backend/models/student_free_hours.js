const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_free_hours', {
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'StudentId'
      }
    },
    ReservedDay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    FreeHourMorning: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    FreeHourAfternoon: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'student_free_hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StudentId" },
          { name: "ReservedDay" },
        ]
      },
    ]
  });
};
