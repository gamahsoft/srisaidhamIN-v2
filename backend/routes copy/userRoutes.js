import express from 'express'
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserById,
	updateUser,
	newsLetterSignup,
	forgotPassword,
	resetPassword,
	paymentIntent,
	createUser,
} from '../controllers/userController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/').post(registerUser)

router.route('/allusers').get(protect, admin, getAllUsers)

router.post('/login', authUser)

router.post('/forgotpass', forgotPassword)

router.patch('/resetpass', resetPassword)

//sign up for news letter
router.post('/newsletter', newsLetterSignup)

//Admin add new user
router.post('/add', createUser)

//protected route requires the jwt token from header
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

//Create Stripe payment Intent
// router.route('/paymentintent').post(protect, paymentIntent)
router.post('/paymentintent', paymentIntent)

export default router
