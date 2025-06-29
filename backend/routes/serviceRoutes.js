import express from "express";

import {
  getServices,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getSaiServices,
  getAllServices,
} from "../controllers/serviceController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(protect, admin, createProduct);
// router.route("/:id/reviews").post(protect, createProductReview);

router.get("/sai-services", getSaiServices);
router.get("/all-services", getAllServices);
// router.get("/wishlist-services", getServices);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
