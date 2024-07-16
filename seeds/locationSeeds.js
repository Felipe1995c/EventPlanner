//import respective model
const { Location } = require('../models');

const locationData = [
  {
    city: 'Paris',
    user_id: 1,
    post_id: 1
  },
  {
    city: 'Honolulu',
    user_id: 1,
    post_id: 2
  },
];

const seedLocations = () => Location.bulkCreate(locationData);

module.exports = seedLocations;