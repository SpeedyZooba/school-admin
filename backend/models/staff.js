const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    Sex: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    PhoneNo: {
      type: DataTypes.STRING(13),
      allowNull: true,
      unique: "PhoneNo"
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    StaffType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ShiftType: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Salary: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StaffId" },
        ]
      },
      {
        name: "PhoneNo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PhoneNo" },
        ]
      },
    ]
  });
};
