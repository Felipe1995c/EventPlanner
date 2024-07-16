//import respective model
const { DressCode } = require('../models');

const dressCodeData = [
  {
    attire: 'Casual',
    user_id: 1,
    post_id: 1
  },
  {
    attire: 'Formal',
    user_id: 1,
    post_id: 2
  }
];

const seedDressCodes = () => DressCode.bulkCreate(dressCodeData);

module.exports = seedDressCodes;