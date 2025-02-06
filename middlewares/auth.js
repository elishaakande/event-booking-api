require("dotenv").config();

const authenticate = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  next();
};

module.exports = authenticate;
