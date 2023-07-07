const router = require("express").Router();
// import our db connection for the SQL literals
const sequelize = require("../../config/connection");
const { User, Product, Category, Transaction } = require("../../models");
// import helper function for authentication
const withAuth = require("../../utils/auth");
// imports segment analytics
const { Analytics } = require("@segment/analytics-node");
const analytics = new Analytics({
  writeKey: "fCvCtaAKBxvdEqrQ2WHlAT1jrsRT5eks",
});

/***** CREATE *****/
// Route to sign up a new user
// POST method with endpoint '/api/users/'

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    // create new user
    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      shipping_address: req.body.shipping_address,
      billing_address: req.body.billing_address,
      payment_info: req.body.payment_info,
      funds: req.body.funds,
      is_admin: req.body.is_admin,
      merchant_id: req.body.merchant_id,
    });

    //save new session to db
    req.session.save(() => {
      // create session variables based on the newly signed up user
      (req.session.userId = newUser.id), (req.session.loggedIn = true);
      res.status(201).json(newUser); // 201 - Created
    });

	//Analytics package used to gather user info upon user creation
    //TO DO CHANGE USER ID FROM BODY TO SESSION
    analytics.identify({
      userId: req.body.email,
      traits: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.shipping_address,
      },
    });

	//Analytics package used to track creation of new users and any errors that might have occured
    //TO DO CHANGE USER ID FROM BODY TO SESSION
    analytics.track({
      userId: req.body.email,
      event: "New User Registration",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** READ *****/
// Route to retrieve all users
// GET method with endpoint '/api/users/'
// TODO: ICEBOX - Admin routes
router.get("/", async (req, res) => {
  try {
    // retrieve all existing users from the database
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(users); // 200 - OK
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

// Route to retrieve logged in user's profile
// GET method with endpoint '/api/users/profile'
// Only authenticated users can retrieve their profile
router.get("/profile", withAuth, async (req, res) => {
  try {
    // retrieve user by his/her id -> since only logged in users can view their profile, id will come from req.session.userId
    const user = await User.findByPk(req.session.userId, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) return res.status(404).json({ message: "No user found." }); // 404 - Not Found

    res.status(200).json(user); // 200 - OK
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

// Route to retrieve a single user by id
// GET method with endpoint '/api/users/:userId'
// TODO: ICEBOX - Admin routes
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) return res.status(404).json({ message: "No user found." }); // 404 - Not Found

    res.status(200).json(user); // 200 - OK
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** UPDATE *****/
// Route to update a user by id
// PUT method with endpoint '/api/users/profile'
// Only authenticated users can update their profile
router.put("/profile", withAuth, async (req, res) => {
  try {
    // pass in req.body to only update what's sent over by the client
    const updatedUser = await User.update(req.body, {
      where: {
        // since only logged in users can update their profile, id will come from req.session.userId
        id: req.session.userId,
      },
      individualHooks: true,
    });

    // if no user was updated, let client know the user was not found
    if (!updatedUser[0])
      return res.status(404).json({ message: "No user found." }); // 404 - Not Found

    res.status(202).json(updatedUser); // 202 - Accepted
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** DELETE *****/
// Route to delete a user by id
// DELETE method with endpoint '/api/users/profile'
// Only authenticated users can delete their profile
router.delete("/profile", withAuth, async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        // since only logged in users can delete their account, id will come from req.session.userId
        id: req.session.userId,
      },
    });

    // if no user was deleted, let client know the user was not found
    if (!deletedUser)
      return res.status(404).json({ message: "No user found." }); // 404 - Not Found

    res.status(202).json(deletedUser); // 202 - Accepted
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

//DELETE method
// DELETE method with endpoint '/api/users/:userId'
// TODO: ICEBOX => Admin routes
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    console.log(deletedUser);

    if (!deletedUser)
      return res.status(404).json({ message: "No user found." }); // 404 - Not Found

    res.status(202).json(deletedUser); // 202 - Accepted
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});


/***** LOGIN *****/
// Route to login an existing user
// POST method with endpoint '/api/users/login'
// expects { "email": "lclaydon0@wunderground.com", "password": "bY9\\}#\\ez" } --> test with any user from seeds userData
router.post("/login", async (req, res) => {
  try {
    // retrieve user by his/her email
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    // if no user found, send back response with 400 status code (stay vague)
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" }); // 400 - Bad Request

    // use 'checkPassword' instance method to validate password provided at login
    const validPw = await user.checkPassword(req.body.password);
    // if password doesn't match, send back response with 400 status code (stay vague)
    if (!validPw)
      return res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" }); // 400 - Bad Request

    // if we have reached that point, then user is validated and we want to create session variables and save a new session for that user in our database
    req.session.save(() => {
      // create session variables based on the logged in user
      req.session.userId = user.id;
      req.session.loggedIn = true;
      // send back response with 200 status code
      res.status(200).json(user); // 200 - OK
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - Internal Server Error
  }
});

/***** LOGOUT *****/
// Route to logout an existing user
// POST method with endpoint '/api/users/logout'
router.post("/logout", async (req, res) => {
  // if user was logged in, delete session from database
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // send back success status code, with no content
      res.status(204).end(); // 204 - No Content
    });
    // otherwise send back client error status code, with no content
  } else {
    res.status(404).end(); // 404 - Not Found
  }
});

module.exports = router;
