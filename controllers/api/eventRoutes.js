const router = require("express").Router();
const { Event } = require("../../models");

// GET all events
router.get('/', async (req, res) => {
  try {
    const eventsData = await Event.findAll();
    res.status(200).json(eventsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new event
router.post("/", async (req, res) => {
  console.log("Incoming Data: ", req.body);

  // Restructure the incoming data for submission to our Database(MODEL)
  let dataObj = {
    event_name: req.body.eventName,
    date: req.body.eventDate,
    location: req.body.eventLocation,
    dresscode: req.body.eventDressCode,
    theme: req.body.eventTheme,
    budget: req.body.eventBudget,
    food: req.body.eventFood,
    rentals: req.body.eventRentals,
    supplies: req.body.eventSupplies,
    entertainment: req.body.eventEntertainment,
    user_id: req.session.user_id,
  };
  try {
    const newEvent = await Event.create(dataObj);
    console.log("Event Created: ", newEvent);
    res.status(200).json(newEvent);
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json(err);
  }
});

// DELETE an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

