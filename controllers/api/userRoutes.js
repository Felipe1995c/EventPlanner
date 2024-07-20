const router = require("express").Router();
// Import the User model from the models folder
// const { User } = require("../../models");
const User = require("../../models/user");

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post("/", async (req, res) => {
  // possibly temp data structuring
  console.log("Incoming Data: ", req.body)

  let newUser = {
    username: req.body.name,
    password: req.body.password,
    email: req.body.email
  }
  console.log('New User Data: ', newUser)
  try {
    const userData = await User.create(newUser);
    console.log("New User: ", userData);
    // here is where we add our authorization
    req.session.save(() => {
      req.session.user_id = userData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json(userData.dataValues);
    });
  } catch (err) {
    console.log("DB error: ", err);
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post("/login", async (req, res) => {
  console.log("Incoming Data: ", req.body)
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
//Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
//Create session variables of the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
    //  res.status(204).end();
      res.status(204).redirect('/login');
    });
  } else {
    res.status(404).end();
  }
});

// If a Post request is made to /api/users/signup,
router.post("/signup", async (req, res) => {
  console.log("Incoming Data: ", req.body)
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
