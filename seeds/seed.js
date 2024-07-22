const sequelize = require('../config/database');
const seedUsers = require('./userSeeds');
const seedGuestList = require('./guestlistSeeds');
const seedBudgets = require('./budgetSeeds'); 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedGuestList();
  console.log('\n----- GUEST LIST SEEDED -----\n');

  // Providing queryInterface and Sequelize to the seedBudgets function
  await seedBudgets(sequelize.getQueryInterface(), sequelize.constructor); 
  console.log('\n----- BUDGETS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();