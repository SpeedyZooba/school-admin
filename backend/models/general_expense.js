const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('general_expense', {
    ExpenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ExpenseName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ExpenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'general_expense',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ExpenseId" },
        ]
      },
    ]
  });
};
