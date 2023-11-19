const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classroom', {
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'classroom',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoomId" },
        ]
      },
    ]
  });
};
