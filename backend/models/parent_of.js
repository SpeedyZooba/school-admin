const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parent_of', {
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'StudentId'
      }
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parent',
        key: 'ParentId'
      }
    }
  }, {
    sequelize,
    tableName: 'parent_of',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StudentId" },
          { name: "ParentId" },
        ]
      },
      {
        name: "ParentId",
        using: "BTREE",
        fields: [
          { name: "ParentId" },
        ]
      },
    ]
  });
};
