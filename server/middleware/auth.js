const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  // Get token from header
  const authHeader = req.header("Authorization");

  // Log the authorization header
  console.log("Authorization header:", authHeader);

  // Check if no token
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract the token from the Bearer
  const token = authHeader.split(" ")[1];

  // Log the extracted token
  console.log("Extracted token:", token);

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
