// Import just the router express
const router = require("express").Router();
const { User, Event } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  // if we want to cature the CURRENT USER
  const currentUserId = req.session.user_id;

  try {
    // here we want to query or sort/filter the data we want to USE in the VIEW
    // --> Username : We need to Query the DB for the rest of the Users data
    // --> logged_in : we get from req.session
    // --> EVENT Data : We need to query the database for ALL/One Event
    // What Actions do we want to ALLOW the user
    // Do we want ALL EVENTS
    // DO we want just a single event

    /*
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']],
      });
      */
    // here we query for the USER data
    const userData = await User.findByPk(currentUserId, {
      attributes: { exclude: ["password"] },
      //  order: [['username', 'ASC']],
    });
    console.log("DB User: ", userData);
    const user = userData.dataValues;
    console.log("All Users: ", user);

    // Here we query for the EVENTs data
    //   const eventData = await Event.findAll();
    //   console.log("Event Data: ", eventData);
    //   // here we are parsing or Sanitizing the returned database data --> dataValues
    //   const events = eventData.map((event) => event.get({ plain: true }));

    res.render("profile", {
      //users,\
      user,
      // events: events,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log("DB Error: ", err);
    res.status(500).json(err);
  }
});

//main page is the login page
router.get("/login", (req, res) => {
  res.render("login");
});

//profile page once authenticated
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/events", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    // // what do we want to do?
    // // we query for events data from the database
    // const events = await Event.findAll();

    // // We sanitize and clean the data
    // events = eventData.map((event) => event.get({ plain: true }));

    // //Filtering by user ID
    // events = events.filter((event) => req.session.user_id === event.user_id);

    // We need to return something --> The View(handlebar) & Event Data (Context Object Data)
    res.render("event", { events: user.events, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
