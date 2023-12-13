const router = require("express").Router();
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  rateProduct,
  uploadProductImage,
  addVariant,
} = require("../controllers/Product.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary/cloudinary.config");

router
  .route("/")
  .post(
    [verifyAccessToken, isAdmin],
    uploadCloud.fields([
      { name: "images", maxCount: 10 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    createProduct
  )
  .get(getAllProducts);

router.route("/ratings").put(verifyAccessToken, rateProduct);

router.route("/upload/:pid").post([verifyAccessToken, isAdmin], uploadProductImage);

router.route("/variants/:pid").put(
  [verifyAccessToken, isAdmin],
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  addVariant
);

router
  .route("/:pid")
  .get(getSingleProduct)
  .delete([verifyAccessToken, isAdmin], deleteProduct)
  .put(
    [verifyAccessToken, isAdmin],
    uploadCloud.fields([
      { name: "images", maxCount: 10 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    updateProduct
  );

module.exports = router;
