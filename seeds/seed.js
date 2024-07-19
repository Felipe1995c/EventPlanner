const seedUsers = require('./userSeeds');
const seedGuestList = require('./guestlistSeeds');
const seedBudget = require('./budgetSeeds');

// establish connection
const sequelize = require('../config/database');

// read eval print loop mode allows sloppy script in seeding otherwise not allowed in strict mode
const { REPL_MODE_SLOPPY } = require('repl');

// asynchronous seeding to await previous step prior to advancing
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedGuestList();
    console.log('\n----- GUESTLISTS SEEDED -----\n');

    await seedBudget();
    console.log('\n----- BUDGETS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();
