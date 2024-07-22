//enforce strict mode for robust code
'use strict';

const seedBudgets = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Budgets', [
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
};

module.exports = seedBudgets;