// middleware/authMiddleware.js
const validApiKey = "8a60348b-d4a4-564a-9b45-aab518adb7f4";

module.exports = (req, res, next) => {
  const apiKey = req.header("apiauthkey");

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(403).json({ error: "apiauthkey is missing or invalid" });
  }

  next();
};
