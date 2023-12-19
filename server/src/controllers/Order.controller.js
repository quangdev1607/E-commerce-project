const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

class OrderController {
  async createOrder(req, res) {
    const { userId } = req.user;
    const { products, total, address, status } = req.body;
    if (address) {
      await User.findByIdAndUpdate(userId, { address, cart: [] });
    }
    const order = await Order.create({ products, total, orderedBy: userId, status });
    res.status(StatusCodes.OK).json({
      success: true,
      result: order,
    });
  }
  async updateStatusOrder(req, res) {
    const { oid } = req.params;
    if (oid.length !== 24) throw new BadRequestError("Order id is not valid");
    const { status } = req.body;
    if (!status) throw new BadRequestError("status is required");
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true }).select("status");
    res.status(StatusCodes.OK).json({
      success: response ? true : false,
      rs: response ? response : "Cannot change status",
    });
  }

  async getOrderByUser(req, res) {
    const queries = { ...req.query };
    const { userId } = req.user;
    const excludedFields = ["limit", "sort", "page", "fields"];
    excludedFields.forEach((item) => delete queries[item]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
    const formatedQueries = JSON.parse(queryString);

    // Filtering
    // if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: "i" };
    // if (queries?.brand) formatedQueries.brand = { $regex: queries.brand, $options: "i" };

    // let queryObject = {};
    // if (queries.q) {
    //   delete formatedQueries.q;
    //   queryObject = {
    //     $or: [
    //       { color: { $regex: queries.q, $options: "i" } },
    //       { title: { $regex: queries.q, $options: "i" } },
    //       { category: { $regex: queries.q, $options: "i" } },
    //       { brand: { $regex: queries.q, $options: "i" } },
    //     ],
    //   };
    // }
    const qr = { ...formatedQueries, orderedBy: userId };
    let result = Order.find(qr);

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

    const orders = await result;
    if (!orders) throw new NotFoundError("Product not found");
    const counts = await Order.find(qr).countDocuments();
    res.status(StatusCodes.OK).json({
      success: orders ? true : false,
      counts,
      data: orders ? orders : "Something wrong",
    });
  }

  async getOrdersByAdmin(req, res) {
    const allOrders = await Order.find().populate("orderedBy", "email");
    res.status(200).json({
      success: true,
      total: allOrders.length,
      allOrders,
    });
  }
}

module.exports = new OrderController();
