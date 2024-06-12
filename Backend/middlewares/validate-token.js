const jwt = require("jsonwebtoken");

// authenticate user
const validateToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res.status(403).json({ message: "User not logged in!" });
  }

  const tokenArray = authorizationHeader.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.status(400).json({ message: "Invalid token format." });
  }

  const token = tokenArray[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = decoded;
  next();
};

module.exports = { validateToken };
