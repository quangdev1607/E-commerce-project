const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        color: String,
        price: Number,
        title: String,
        thumbnail: String,
      },
    ],
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Succeed"],
    },
    total: { type: Number },

    orderedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
