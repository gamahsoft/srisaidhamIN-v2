// import asyncHandler from 'express-async-handler'
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  var userid = "";
  // calculate total order price
  function calculateOrderAmount(cartItems) {
    return cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.cartQuantity;
    }, 0);
  }

  const {
    orderItems,
    userID,
    bankName,
    checkNumber,
    // shippingAddress,
    paymentMethod,
    // itemsPrice,
    // taxPrice,
    // shippingPrice,
    // totalPrice,
  } = req.body;

  const totalPrice = calculateOrderAmount(orderItems);
  const taxPrice = 0.0;
  const shippingPrice = 0.0;

  //Admin functionality to tie the order to correct user.
  if (userID !== req.user._id && userID != null) {
    userid = userID;
  } else {
    userid = req.user._id;
  }

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    //Update user record If membership order is purchased
    orderItems.forEach((element) => {
      if (element.product.name === "Annual Membership") {
        let today_date = new Date();
        let current_year = today_date.getFullYear();

        User.findByIdAndUpdate(
          { _id: userid },
          { member: true, memberActiveDate: current_year },
          function (err) {
            if (err) {
              console.log("findbyidandupdate error:", err);
            }
          }
        );
      }
    });

    //Create the order record. This record should ideally replaced by stripe credit card webhook
    const order = new Order({
      // user: req.user._id,
      user: userid,
      // orderItems,
      // shippingAddress,
      paymentMethod,
      bankName,
      checkNumber,
      // itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  //populate fields from user object and attach to findbyid
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to Paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //populate fields from user object and attach to findbyid
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name"); //get the user name associated with that order
  res.json(orders);
});

// @desc Update order to Delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //populate fields from user object and attach to findbyid
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc stripe checkout session for payment
// @route GET /api/orders/checkout-session
// @access Private
const getCheckoutSession = asyncHandler(async (req, res) => {
  //1) Get the cart items

  //2) Create checkout session

  //3) Create session as response

  //populate fields from user object and attach to findbyid
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//create payment intent for stripe
const createPaymentIntent = async (req, res) => {
  console.log("I am in node createpayment intent");
  const { total: amount, cardInfo: payment_intent, email } = req.body;
  // Validate the amount that was passed from the client.
  if (!(amount >= process.env.MIN_AMOUNT && amount <= process.env.MAX_AMOUNT)) {
    return res.status(500).json({ message: "Invalid amount." });
  }
  if (payment_intent.id) {
    try {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent.id
      );
      // If PaymentIntent has been created, just update the amount.
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent.id,
          {
            amount: formatAmountForStripe(amount, process.env.CURRENCY),
          }
        );
        console.log("updated_intent", updated_intent);
        return res.send(updated_intent);
      }
    } catch (err) {
      if (err.code !== "resource_missing") {
        const errorMessage =
          err instanceof Error ? err.message : "Internal server error";
        return res.status(500).send({ message: errorMessage });
      }
    }
  }

  try {
    // Create PaymentIntent from body params.
    const params = {
      amount: formatAmountForStripe(amount, process.env.CURRENCY),
      currency: process.env.CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? "",
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const payment_intent = await stripe.paymentIntents.create(params);
    console.log("payment_intent", payment_intent);

    res.send(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).send({ message: errorMessage });
  }
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getCheckoutSession,
  createPaymentIntent,
};
