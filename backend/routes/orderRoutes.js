import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getCheckoutSession,
  // createPaymentIntent,
} from "../controllers/orderController.js";
import { createPaymentIntent } from "../controllers/userOrderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//protected route requires the jwt token from header
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// create stripe payment intent
router.post("/payment-intent", createPaymentIntent);
router.route("/myorders").get(protect, getMyOrders);
//make sure this order by id route is below the '/' route but not before
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

//Stripe checkout
router.route("/checkout-session/:productID").get(protect, getCheckoutSession);

export default router;
