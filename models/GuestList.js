//strict mode for robust code
'use strict';

// Import parts from sequelize library
const { Model, DataTypes } = require('sequelize');

// Import database connection from connection.js
const sequelize = require('../config/database');

// Initialize GuestList model by extending from Sequelize's Model class
class GuestList extends Model {}

// Establish fields and rules for GuestList model
GuestList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'guestList',
  }
);

module.exports = GuestList;
