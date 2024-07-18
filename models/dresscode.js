'use strict';

module.exports = (sequelize, DataTypes) => {
  const DressCode = sequelize.define('DressCode', {
    attire: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // assuming you have a Users model
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // assuming you have a Posts model
        key: 'id'
      }
    }
  }, {
    timestamps: false // set to false if you don't need createdAt and updatedAt fields
  });

  DressCode.associate = function(models) {
    // associations can be defined here
    DressCode.belongsTo(models.User, { foreignKey: 'user_id' });
    DressCode.belongsTo(models.Post, { foreignKey: 'post_id' });
  };

  return DressCode;
};
