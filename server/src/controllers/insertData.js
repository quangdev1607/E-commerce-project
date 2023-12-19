const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const data = require("../../../data/productData.json");
const categoryData = require("../../../data/brandData");
const slugify = require("slugify");

const insertData = async (product) => {
  await Product.create({
    title: product?.title,
    slug: slugify(product?.title) + Math.floor(Math.random() * 1000) + "",
    description: { spec: product?.description?.spec, info: product?.description?.info },
    brand: product?.brand,
    price: product?.price.startsWith("$")
      ? Math.round(Number(product.price.match(/\d/g).join("")) / 100) * 24300
      : Math.round(Number(product.price.match(/\d/g).join("")) / 100),
    category: product?.category,
    quantity: Math.floor(Math.random() * 1000),
    sold: Math.floor(Math.random() * 100),
    images: product?.images.photos,
    thumbnail: product?.images.thumbnail,
    color: product?.variants?.find((el) => el?.label === "Color")?.options[0] || "Black",
    totalRatings: 0,
  });
};

const insertCategoriesData = async (cate) => {
  await ProductCategory.create({
    category: cate?.category,
    brand: cate?.products,
    image: cate?.image,
  });
};

class InsertProductController {
  async insertProduct(req, res) {
    const promises = [];
    for (let product of data) promises.push(insertData(product));
    await Promise.all(promises);

    return res.status(200).json("Done");
  }

  async insertCategories(req, res) {
    const promises = [];
    for (let category of categoryData) promises.push(insertCategoriesData(category));
    await Promise.all(promises);
    return res.status(200).json("Done");
  }
}

module.exports = new InsertProductController();
