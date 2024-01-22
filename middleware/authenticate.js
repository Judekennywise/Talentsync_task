const User = require("./../model/User.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const tokenBlacklist = require("./../controller/user.controller").tokenBlacklist



exports.authenticate = async (req, res, next) => {
    try {
      let token;
      //Check if token was passed in the header and then retrieve
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return next(res.status(401).json("Unauthorized"));
      }
      // Check if the token is in the blacklist
      if (tokenBlacklist.has(token)) {
        return res.sendStatus(401);
      }
      //verify if token has been altered || if token has expired
      const decodedPayload = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      //check if user still exist using the token payload
      const currentUser = await User.findById(decodedPayload.id);
      if (!currentUser)
        return next(res.status(401).json("User with this token does not exist"));
  
      //Assign user to the req.user object
      req.user = currentUser;
      next();
    } catch (err) {
      res.json(err);
    }
  };
