const User = require("./../model/User.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// jwt sign token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

exports.tokenBlacklist = new Set()

// sign up a new user
exports.signup = async (req, res, next) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists. Please use a different email.",
      });
    }

    // Create a new user if email doesn't exist
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    // Assign token to user
    const token = signToken(newUser._id);

    // Hide password before returning user's details
    newUser.password = undefined;

    // Send back response
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    // Handle other errors
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//log in a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if user provided email and password
    if (!email || !password) {
      res.status(401).json("Please provide email and password");
      return next(new Error("Please provide email and password"));
    }
    //check if user exist in the database and compare passwords
    const user = await User.findOne({ email });
    if (!user && !(await user.isValidPassword(password, user.password))) {
      res.status(400).json("Incorrect email or password");
      return next(new Error("Incorrect email or password"));
    }
     //assign toke to user
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    throw err;
  }
};

exports.logout = async (req, res) => {
    const { token } = req.body;
  
    // Add the token to the blacklist
    tokenBlacklist.add(token);
  
    res.json({ message: 'Logout successful' });
  };