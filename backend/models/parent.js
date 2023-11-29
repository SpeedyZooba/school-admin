const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parent', {
    ParentId: {
      autoIncrement: true,
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
    PhoneNo: {
      type: DataTypes.STRING(13),
      allowNull: true,
      unique: "PhoneNo"
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'parent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ParentId" },
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
