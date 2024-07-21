//place associations here
const User = require("./user");
const Budget = require("./budget");
const GuestList = require("./GuestList");
const Event = require("./event");

Budget.belongsTo(User, {
  foreignKey: "id",
});

GuestList.belongsTo(User, {
  foreignKey: "id",
});

User.hasMany(Event, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Budget, GuestList, Event };
