const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff_working_hours', {
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'staff',
        key: 'StaffId'
      }
    },
    ReservedDay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    StaffHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'staff_working_hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffId" },
          { name: "ReservedDay" },
          { name: "StaffHour" },
        ]
      },
    ]
  });
};
