const {
  register,
  allUser,
  logIn,
  getOneUser,
  refreshToken,
  logOut,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  addUserCart,
  handleRegister,
} = require("../controllers/User.controller");
const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", register);
router.put("/register-verification/:token", handleRegister);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.post("/login", logIn);
router.post("/refreshtoken", refreshToken);
router.get("/logout", logOut);
router.get("/current", verifyAccessToken, getOneUser);
router.get("/", verifyAccessToken, isAdmin, allUser);
router.delete("/", verifyAccessToken, isAdmin, deleteUser);
router.put("/update", verifyAccessToken, updateUser);
router.put("/address", verifyAccessToken, updateUserAddress);
router.put("/cart", verifyAccessToken, addUserCart);
router.put("/:userId", verifyAccessToken, isAdmin, updateUserByAdmin);

module.exports = router;
