import stripe from "stripe";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// const stripe = require("stripe")(`${process.env.STRIPE_KEY}` || null); /// use hardcoded key if env not work

import {
  handleProductQuantity,
  formatAmountForStripe,
} from "../config/utilities.js";

const addOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
    handleProductQuantity(order.cart);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// @desc stripe payment intent
// @route POST /api/users/paymentIntent
// @access private

function calculateOrderAmount(cartItems) {
  return (
    cartItems.reduce(
      (total, sevaItem) => total + sevaItem.cartQty * sevaItem.price,
      0
    ) * 100
  );
}

// {cartItems
//   .reduce((acc, item) => acc + item.cartQty * item.price, 0)
//   .toFixed(2)}

//create payment intent for stripe
const createPaymentIntent = async (req, res) => {
  // const { total: amount, cardInfo: payment_intent, email } = req.body;

  const { orderItems } = req.body;

  // console.log("orderItems", orderItems);

  const totalAmount = calculateOrderAmount(orderItems);
  const totalPrice = totalAmount / 100;
  // console.log("totalAmount: ", totalAmount);
  // console.log("totalPrice: ", totalPrice);
  // Validate the amount that was passed from the client.
  if (
    !(
      totalPrice >= process.env.MIN_AMOUNT &&
      totalPrice <= process.env.MAX_AMOUNT
    )
  ) {
    return res.status(500).json({ message: "Invalid amount." });
  }

  try {
    const paymentIntent = await stripe(
      process.env.STRIPE_KEY
    ).paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      // description,
      // payment_method_types: ["bancontact", "card"],
      // payment_method_types: ["card"],
      // receipt_email,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // console.log(
    //   "From Server userOrderController.js clientSecret : ",
    //   paymentIntent.client_secret
    // );
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occured, unable to create payment intent" });
  }
  // if (payment_intent.id) {
  //   try {
  //     const current_intent = await stripe.paymentIntents.retrieve(
  //       payment_intent.id
  //     );
  //     // If PaymentIntent has been created, just update the amount.
  //     if (current_intent) {
  //       const updated_intent = await stripe.paymentIntents.update(
  //         payment_intent.id,
  //         {
  //           amount: formatAmountForStripe(amount, process.env.CURRENCY),
  //         }
  //       );
  //       console.log("updated_intent", updated_intent);
  //       return res.send(updated_intent);
  //     }
  //   } catch (err) {
  //     if (err.code !== "resource_missing") {
  //       const errorMessage =
  //         err instanceof Error ? err.message : "Internal server error";
  //       return res.status(500).send({ message: errorMessage });
  //     }
  //   }
  // }
  // try {
  // Create PaymentIntent from body params.
  //   const params = {
  //     amount: formatAmountForStripe(amount, process.env.CURRENCY),
  //     currency: process.env.CURRENCY,
  //     description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
  //     automatic_payment_methods: {
  //       enabled: true,
  //     },
  //   };
  //   const payment_intent = await stripe.paymentIntents.create(params);
  //   console.log("payment_intent", payment_intent);

  //   res.send(payment_intent);
  // } catch (err) {
  //   const errorMessage =
  //     err instanceof Error ? err.message : "Internal server error";
  //   res.status(500).send({ message: errorMessage });
  // }
};

// get all orders user
const getOrderByUser = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pages = Number(page) || 1;
    const limits = Number(limit) || 8;
    const skip = (pages - 1) * limits;

    const totalDoc = await Order.countDocuments({ user: req.user._id });

    // total padding order count
    const totalPendingOrder = await Order.aggregate([
      {
        $match: {
          status: "Pending",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // total padding order count
    const totalProcessingOrder = await Order.aggregate([
      {
        $match: {
          status: "Processing",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalDeliveredOrder = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
          user: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // today order amount

    // query for orders
    const orders = await Order.find({ user: req.user._id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limits);

    res.send({
      orders,
      limits,
      pages,
      pending: totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0].count,
      processing:
        totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
      delivered:
        totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,

      totalDoc,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export { addOrder, getOrderById, getOrderByUser, createPaymentIntent };
