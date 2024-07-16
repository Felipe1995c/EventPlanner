//import respective model
const { GuestList } = require('../models');

const guestListData = [
  {
    first_name: 'John',
    last_name: 'Doe'
  },
  {
    first_name: 'Jane',
    last_name: 'Doe'
  },
  {
    first_name: 'Billy',
    last_name: 'Mays'
  }
];

const seedGuestLists = () => GuestList.bulkCreate(guestListData);

module.exports = seedGuestLists;