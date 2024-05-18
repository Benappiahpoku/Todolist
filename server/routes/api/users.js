const express = require("express"); // Import express
const router = express.Router(); // Create a new router
const bcrypt = require("bcryptjs"); // Import bcrypt
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const config = require("config"); // Import config
const User = require("../../models/User"); // Import the User model
const auth = require("../../middleware/auth"); // Import the auth middleware

// Get JWT Secret
const jwtSecret = config.get("jwtSecret"); // Get the jwtSecret from the config

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(`Attempting to authenticate user with email: ${email}`);

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
        console.log(`No user found with email: ${email}`);
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log(`Password does not match for user with email: ${email}`); 
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  console.log("Register route hit"); // Log when the route is hit
  const { username, email, password } = req.body;

  console.log(`Name: ${username}, Email: ${email}, Password: ${password}`); // Log the request body

  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log("User saved"); // Log when the user is saved

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      console.log("Token generated"); // Log when the token is generated
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
