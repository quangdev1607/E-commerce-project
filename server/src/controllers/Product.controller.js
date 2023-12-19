const Product = require("../models/product");
const { BadRequestError, UnAuthenticatedError, NotFoundError } = require("../errors");
const slugify = require("slugify");
const { StatusCodes } = require("http-status-codes");

class ProductController {
  async createProduct(req, res) {
    const { title, description, brand, price, category, color } = req.body;
    const thumbnail = req.files["thumbnail"][0].path;
    const images = req.files["images"].map((img) => img.path);
    if (!title || !description || !brand || !price || !category || !color)
      throw new BadRequestError("missing inputs");
    req.body.slug = slugify(req.body.title);
    const formatedBrand = brand.toUpperCase();

    if (!thumbnail) throw new BadRequestError("Thumbnail is required");
    const newProduct = await Product.create({
      ...req.body,
      description: { spec: description },
      brand: formatedBrand,
      thumbnail,
      images,
    });
    res.status(StatusCodes.CREATED).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Cannot create product",
    });
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const files = req?.files;
    delete req.body.thumbnail;
    delete req.body.images;
    if (files?.thumbnail) {
      req.body.thumbnail = files["thumbnail"][0].path;
    }
    if (files?.images) {
      req.body.images = files["images"].map((img) => img.path);
    }

    if (pid.length !== 24) throw new Error("PID is not valid");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const product = await Product.findByIdAndUpdate(
      pid,
      { ...req.body, description: { spec: req.body.description } },
      { new: true }
    );
    if (!product) throw new NotFoundError("Product not found");
    res.status(StatusCodes.OK).json({
      success: product ? true : false,
      updatedProduct: product ? product : "Something wrong",
    });
  }

  async addVariant(req, res) {
    const { pid } = req.params;
    const thumbnail = req.files["thumbnail"][0].path;
    const images = req.files["images"]?.map((img) => img.path);
    const { title, color, price } = req.body;
    if (!(title && color && price)) throw new BadRequestError("Missing inputs");
    if (!thumbnail) throw new BadRequestError("Thumbnail is required");

    if (pid.length !== 24) throw new Error("PID is not valid");
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const product = await Product.findByIdAndUpdate(
      pid,
      { $push: { variants: { title, price, color, thumbnail, images, sku: crypto.randomUUID() } } },
      { new: true }
    );
    if (!product) throw new NotFoundError("Product not found");
    res.status(StatusCodes.OK).json({
      success: product ? true : false,
      variants: product ? product : "Something wrong",
    });
  }

  async getSingleProduct(req, res) {
    const { pid } = req.params;
    if (pid.length !== 24) throw new Error("PID is not valid");
    const product = await Product.findById(pid).populate("rating.postedBy", "firstname lastname");
    if (!product) throw new NotFoundError("Product not found");
    res.status(StatusCodes.OK).json({
      success: product ? true : false,
      productData: product ? product : "Something wrong",
    });
  }

  // Filtering, Sorting, Pagination
  async getAllProducts(req, res) {
    // Nếu gán queries = req.query thì nó sẽ trỏ queries về cùng 1 ô với req.query => Không phải copy
    // Gán như kiểu dưới thì sẽ tạo ra một ô mới và cop dữ liệu của req.query
    const queries = { ...req.query };

    // Tách các trường đặc biệt ra khỏi query
    const excludedFields = ["limit", "sort", "page", "fields"]; // 'fields' giúp trả về đúng dữ liệu mà client yêu cầu, không thừa không thiếu
    excludedFields.forEach((item) => delete queries[item]);

    // Format lại các operator cho đúng cú pháp của Mongodb
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
    const formatedQueries = JSON.parse(queryString);
    let colorQueryObject = {};
    // Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: "i" };
    if (queries?.brand) formatedQueries.brand = { $regex: queries.brand, $options: "i" };
    if (queries?.color) {
      delete formatedQueries.color;
      const colorArr = queries.color?.split(",");
      const colorQuery = colorArr.map((el) => ({ color: { $regex: el, $options: "i" } }));
      colorQueryObject = { $or: colorQuery };
    }

    let queryObject = {};
    if (queries.q) {
      delete formatedQueries.q;
      queryObject = {
        $or: [
          { color: { $regex: queries.q, $options: "i" } },
          { title: { $regex: queries.q, $options: "i" } },
          { category: { $regex: queries.q, $options: "i" } },
          { brand: { $regex: queries.q, $options: "i" } },
        ],
      };
    }
    const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };

    let result = Product.find(qr);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      result = result.sort(sortBy);
    } else {
      result = result.sort("-createdAt"); // Auto sắp xếp theo latest
    }

    // Fields
    if (req.query.fields) {
      const fieldList = req.query.fields.split(",").join(" ");
      result = result.select(fieldList);
    } else {
      result = result.select("-__v");
    }

    // Paginations:
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // Execute query command
    // Số lượng sp thỏa mãn điều kiện !== Số lượng sản phẩm trả về 1 lần gọi API
    /*
        viết trên query: price[gt] = 12000 
                         price[gte] = 3000
            => price: {$gt : 12000, $gte : 3000}
        */
    const products = await result;
    if (!products) throw new NotFoundError("Product not found");
    const counts = await Product.find(qr).countDocuments();
    res.status(StatusCodes.OK).json({
      success: products ? true : false,
      counts,
      data: products ? products : "Something wrong",
    });
  }

  async deleteProduct(req, res) {
    const { pid } = req.params;
    if (pid.length !== 24) throw new Error("PID is not valid");
    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) throw new NotFoundError("Product not found");
    res.status(StatusCodes.OK).json({
      success: deletedProduct ? true : false,
      msg: deletedProduct
        ? `${deletedProduct.title} product has been deleted`
        : "Something is wrong",
    });
  }

  async rateProduct(req, res) {
    const { userId } = req.user;
    const { star, comment, pid, updatedAt } = req.body;
    if (!star || !pid) throw new BadRequestError("missing inputs");

    //Trường hợp thằng user đã rate sản phẩm rồi
    const ratingProduct = await Product.findById(pid);
    const hasRated = ratingProduct?.rating?.find((el) => el.postedBy.toString() === userId); // trả về rating object nếu user đã rate sản phẩm

    if (hasRated) {
      // update lại star và comment
      await Product.updateOne(
        { rating: { $elemMatch: hasRated } },
        {
          $set: {
            "rating.$.star": star,
            "rating.$.comment": comment,
            "rating.$.updatedAt": updatedAt,
          },
        },
        { new: true }
      );
    } else {
      // add star và comment
      await Product.findByIdAndUpdate(
        pid,
        { $push: { rating: { star, comment, postedBy: userId, updatedAt } } },
        { new: true }
      );
    }

    // Tính trung bình ratings
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.rating.length;
    const sumRating = updatedProduct.rating.reduce((accum, el) => accum + Number(el.star), 0);
    updatedProduct.totalRatings = Math.round((sumRating * 10) / ratingCount) / 10; // Nhân 10 và chia 10 để kq là số thập phân

    await updatedProduct.save();

    res.status(StatusCodes.OK).json({
      success: updatedProduct ? true : false,
      updatedProduct,
    });
  }

  async uploadProductImage(req, res) {
    const { pid } = req.params;
    if (!req.files) throw new BadRequestError("No files found");
    const product = await Product.findByIdAndUpdate(
      pid,
      { $push: { images: { $each: req.files.map((item) => item.path) } } },
      { new: true }
    );
    if (!product) throw new NotFoundError("Product not found");
    res.status(StatusCodes.OK).json({
      success: product ? true : false,
      product: product ? product : "Cannot upload images",
    });
  }
}

module.exports = new ProductController();
