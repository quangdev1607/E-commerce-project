const router = require("express").Router();
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  rateProduct,
  uploadProductImage,
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

router
  .route("/:pid")
  .get(getSingleProduct)
  .delete([verifyAccessToken, isAdmin], deleteProduct)
  .put([verifyAccessToken, isAdmin], updateProduct);

module.exports = router;
