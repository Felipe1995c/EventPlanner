'use strict';

module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return Budget;
};
