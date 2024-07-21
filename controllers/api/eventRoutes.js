const router = require('express').Router();
// Import the Project model from the models folder
const { Event } = require('../../models');


// If a POST request is made to /api/events, a new Event is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
  console.log("Incoming Data: ", req.body)

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
    // Add any Addtional Data to our Object
    user_id: req.session.user_id,
  }
  try {
  //  const newobj = new Event(dataObj)
    const newEvent = await Event.create(dataObj);
    console.log("Event Created: ", newEvent)
    res.status(200).json(newEvent);
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/events/:id, that event is deleted. 
router.delete('/:id', async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
