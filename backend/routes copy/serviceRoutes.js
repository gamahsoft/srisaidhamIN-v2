import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";

import {
  getServices,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getProductsByBrand,
} from "../controllers/serviceController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(protect, admin, createProduct);
// router.route("/:id/reviews").post(protect, createProductReview);

router.get("/top", getTopProducts);
router.get("/deities", getProductsByBrand);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
