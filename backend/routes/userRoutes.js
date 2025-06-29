import express from "express";
import {
  authUser,
  registerUser,
  signoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  newsLetter,
  forgotPassword,
  resetPassword,
  paymentIntent,
  createUser,
  contactUs,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

import { passwordVerificationLimit } from "../config/utilities.js";

const router = express.Router();

// router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route("/register").post(registerUser);

router.route("/allusers").get(protect, admin, getAllUsers);

router.post("/login", authUser);

router.post("/signout", signoutUser);

router.post("/forgotpass", passwordVerificationLimit, forgotPassword);

router.patch("/resetpass", resetPassword);

//sign up for news letter
router.post("/newsletter", newsLetter);

//sign up for news letter
router.post("/contactus", contactUs);

//Admin add new user
router.post("/add", createUser);

//protected route requires the jwt token from header
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

//Create Stripe payment Intent
// router.route('/paymentintent').post(protect, paymentIntent)
// router.post("/paymentintent", paymentIntent);

export default router;
