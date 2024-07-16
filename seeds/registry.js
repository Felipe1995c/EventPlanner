'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GiftRegistries', [
      {
        item: 'Toaster',
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item: 'Blender',
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item: 'Cutlery Set',
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        item: 'Cookware Set',
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GiftRegistries', null, {});
  }
};