// Import respective model
const { GuestList } = require('../models');

const guestListData = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com'
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com'
  },
  {
    first_name: 'Billy',
    last_name: 'Mays',
    email: 'billy.mays@example.com'
  }
];

const seedGuestLists = () => GuestList.bulkCreate(guestListData);

module.exports = seedGuestLists;
