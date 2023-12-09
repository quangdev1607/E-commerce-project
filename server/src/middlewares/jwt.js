const jwt = require("jsonwebtoken");

const createAccessToken = (uid, role) =>
  jwt.sign(
    { userId: uid, role }, // payload (object muốn hash)
    process.env.JWT_SECRET, // secret key
    { expiresIn: "1d" } // option: khai báo thời gian hết hạn token
  );

const createRefreshToken = (uid) =>
  jwt.sign({ userId: uid }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "7d" });

module.exports = {
  createAccessToken,
  createRefreshToken,
};
