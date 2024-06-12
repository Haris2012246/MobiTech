const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { comparePasswords } = require("../utils/password-hash");

// get logged-in user details
const userDetails = async (req, res) => {
  const user = await Users.findByPk(req.user.userId);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const { password, ...userDetails } = user.dataValues;
  res.status(200).send(userDetails);
};

// authenticate user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isMatch = await comparePasswords(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, {
      expiresIn: "7y",
    });
    const { password, ...userDetails } = user.dataValues;
    return res.status(200).send({ user: userDetails, token });
  } else {
    return res.status(401).send({ message: "Invalid Credentials" });
  }
};

// create new user
const signup = async (req, res) => {
  const { email, name, password, contactNumber } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (user) {
    return res.status(409).send({ message: "User already exists" });
  }

  await Users.create({ email, name, password, contactNumber });
  res.status(201).send({ message: "Account created successfully" });
};

module.exports = {
  login,
  signup,
  userDetails,
};
