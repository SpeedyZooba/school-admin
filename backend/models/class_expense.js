const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_expense', {
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
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ExpenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'class_expense',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SectionId" },
          { name: "CourseId" },
          { name: "ProductId" },
          { name: "ExpenseDate" },
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
