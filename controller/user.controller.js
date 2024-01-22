const User = require("./../model/User.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//jwt sign token function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24",
  });
};

exports.tokenBlacklist = new Set();

//sign up a new user
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    
    //assign token to user
    const token = signToken(newUser._id);

    //hide password before returning user's details
    newUser.password = undefined;

    //send back response
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if (err) return next(err);
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