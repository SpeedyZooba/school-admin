const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false
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
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    GradDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StudentId" },
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
