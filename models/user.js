//strict mode for robust code
'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

// Protect sensitive user data using bcrypt
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlphaNumeric: true,
            validate: {
                len: [8],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        hooks: {
            //creates an object with hashed password after newUserData is created
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          //hashes password provided in updatedUserData and then saves it to database
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
);

module.exports = User;