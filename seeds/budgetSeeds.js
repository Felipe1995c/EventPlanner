//enforce strict mode for robust code
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Budgets', [
      {
        category: 'Food',
        amount: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Rentals',
        amount: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Supplies',
        amount: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Entertainment',
        amount: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Budgets', null, {});
  }
};