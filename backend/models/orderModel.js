import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: "Product",
        },
      },
    ],

    bankName: {
      type: String,
    },
    checkNumber: {
      type: String,
    },

    paymentMethod: {
      type: String,
      required: false,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    itemsPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    ShippingPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
