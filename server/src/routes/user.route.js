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
  removeCartProduct,
} = require("../controllers/User.controller");
const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary/cloudinary.config");

router.post("/register", register);
router.put("/register-verification/:token", handleRegister);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.post("/login", logIn);
router.post("/refreshtoken", refreshToken);
router.get("/logout", logOut);
router.get("/current", verifyAccessToken, getOneUser);
router.get("/", verifyAccessToken, isAdmin, allUser); // All users
router.put(
  "/update",
  verifyAccessToken,
  uploadCloud.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser
);
router.put("/address", verifyAccessToken, updateUserAddress);
router.put("/cart", verifyAccessToken, addUserCart);
router.delete("/remove-cart/:pid", verifyAccessToken, removeCartProduct);
router.delete("/:userId", verifyAccessToken, isAdmin, deleteUser);
router.put("/:userId", verifyAccessToken, isAdmin, updateUserByAdmin);

module.exports = router;
