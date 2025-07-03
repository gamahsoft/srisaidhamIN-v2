// import asyncHandler from 'express-async-handler'
import crypto from "crypto";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import mailchimp from "@mailchimp/mailchimp_marketing";
import generateToken from "../utils/generateToken.js";
// import { sendTemplateEmail } from "../utils/email.js";
import { sendNodeEmail } from "../utils/email.js";
// import { tokenForVerify } from "../config/auth.js";

import stripe from "stripe";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("+password");
  // const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    //don't send password in the response
    user.password = undefined;

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password, gotra, nakshatra, newsletter } =
    req.body;

  console.log("Register New user: ", req.body);
  // const userExists = await User.findOne({ email: email }).select("+password");
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    phone,
    email,
    password,
    gotra,
    nakshatra,
    newsletter,
  });

  if (user) {
    generateToken(res, user._id);
    //don't send password in the response
    user.password = undefined;

    res.status(200).json({
      _id: user._id,
      name: user.name,
      gotra: user.gotra,
      nakshatra: user.nakshatra,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc signout user / clear cookie
//@route POST /api/users/signout
//@access private
const signoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  //Get the Logged in User Id
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get all users
// @route GET /api/users
// @access private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get user by ID
// @route GET /api/users/:id
// @access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  //Get the Id from request (Admin User)
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    user.gotra = req.body.gotram || user.gotra;
    user.isAdmin = req.body.isAdmin;
    // if (req.body.password) {
    // 	user.password = req.body.password
    // }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
      gotram: updatedUser.gotram,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc forgot password
// @route POST /api/forgotpass
// @access Public

// const forgotPassword = asyncHandler(async (req, res) => {
//   // 1) Get user based on Posted email
//   const { email } = req.body;

//   const user = await User.findOne({ email: email });

//   if (!user) {
//     // res.status(404).send({
//     //   message: "User Not found with this email!",
//     // });;
//     res.status(404);
//     throw new Error("User not found with this email");
//   }

//   if (user) {
//     //2) Generate the random reset token
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     //3) Send it to user's email- Below code is for backend host details but we need localhost details
//     // const resetURL = `${req.protocol}://${req.get(
//     // 	'host'
//     // )}/resetpass?token=${resetToken}&id=${user._id}`

//     const resetURL = `http://localhost:5173/resetpass?token=${resetToken}&id=${user._id}`;
//     // const resetURL = `https://www.srisaidham.org/resetpass?token=${resetToken}`;

//     const fromEmail = "sam@digitalseva.us";
//     const TemplateID = "d-5ced0842d589491198c2585cdb977d92";
//     const templateData = resetURL;
//     const devotee = user.name;

//     try {
//       sendTemplateEmail(email, fromEmail, TemplateID, templateData, devotee);
//       res.status(200).send({
//         message:
//           "Please check your email inbox or junk folder for RESET password link",
//       });
//     } catch (err) {
//       user.PasswordResetToken = undefined;
//       user.PasswordResetExpires = undefined;
//       await user.save({ validateBeforeSave: false });

//       throw new Error(
//         "There was an error sending email. Try again latter!",
//         500
//       );
//     } finally {
//       res.status(404);
//       throw new Error(
//         "Please check your email inbox or junk folder for RESET password link"
//       );
//     }
//   }

//   //2) Generate the random reset token
//   // const resetToken = user.createPasswordResetToken()
//   // await user.save({ validateBeforeSave: false })

//   //3) Send it to user's email
//   // const resetURL = `${req.protocol}://${req.get(
//   // 	'host'
//   // )}/api/users/resetpassword/${resetToken}`

//   // const message = `If you have requested for an password reset then please click on the link and follow the instructions: ${resetURL}. \nIf you didn't request password reset then please ignore this email`

//   // try {
//   // 	await sendEmail({
//   // 		email: user.email,
//   // 		subject: 'Your password reset email (valid for 10 min)',
//   // 		message,
//   // 	})

//   // 	res.status(200).json({
//   // 		status: 'success',
//   // 		message: 'Password reset email sent successfully',
//   // 	})
//   // } catch (err) {
//   // 	user.PasswordResetToken = undefined
//   // 	user.PasswordResetExpires = undefined
//   // 	await user.save({ validateBeforeSave: false })

//   // 	throw new Error('There was an error sending email. Try again latter!', 500)
//   // }

//   // try {
//   // 	sendEmail()

//   // 	console.log('Password reset email sent successfully')
//   // } catch (err) {
//   // 	user.PasswordResetToken = undefined
//   // 	user.PasswordResetExpires = undefined
//   // 	await user.save({ validateBeforeSave: false })

//   // 	throw new Error('There was an error sending email. Try again latter!', 500)
//   // }
//   // const fromEmail = 'sam@digitalseva.us'
//   // const TemplateID = 'd-5ced0842d589491198c2585cdb977d92'
//   // const templateData = resetURL
//   // const devotee = user.name

//   // try {
//   // 	sendTemplateEmail(email, fromEmail, TemplateID, templateData, devotee)
//   // } catch (err) {
//   // 	user.PasswordResetToken = undefined
//   // 	user.PasswordResetExpires = undefined
//   // 	await user.save({ validateBeforeSave: false })

//   // 	throw new Error('There was an error sending email. Try again latter!', 500)
//   // }
// });

// @desc forgot password
// @route POST /api/forgotpass
// @access Public

const forgotPassword = asyncHandler(async (req, res) => {
  // 1) Get user based on Posted email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // res.status(404).send({
    //   message: "User Not found with this email!",
    // });;
    res.status(404);
    throw new Error("User not found with this email");
  }

  try {
    if (user) {
      // Generate random user token
      //2) Generate the random reset token
      const token = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const body = {
        from: process.env.EMAIL_USERNAME,
        to: `${req.body.email}`,
        subject: "Saidham: Your password reset request",
        html: `<h2>Hello ${user.name},</h2>
      <p>A request has been received to change the password for your <strong>Sri Saidham</strong> account </p>

      <p>This link will expire in <strong> 15 minute</strong>.</p>

      <p style="margin-bottom:20px;">Click this link for reset your password</p>

      <a href=${process.env.STORE_URL}/resetpass?token=${token} style="background:#fb923c;color:white;border:1px solid #000; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

      <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@srisaidham.org</p>

      <p style="margin-bottom:0px;">Thank you</p>
      <strong>Sri Saidham Team</strong>
             `,
      };
      const message = "Please check your email to verify!";
      sendNodeEmail(body, res, message);
    }
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new Error("There was an error sending email. Try again latter!", 500);
  }
});

// @desc reset password
// @route POST /api/resetpassword
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  //1) Get user based on the token
  const { token, newPassword } = req.body;

  console.log("token: ", token);
  console.log("newPassword: ", newPassword);
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there user, set the new password
  if (!user) {
    console.log("find user using token: ");
    throw new Error("Token is invaid or has expired!", 400);
  } else {
    user.password = newPassword;
    // user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    //3) Update changed passwordAt property for the user
    //4) Log the user in, send JWT

    const token = generateToken(res, user._id);

    res.status(200).json({
      message: "Success🙂 you are now logged in!",
      _id: user._id,
      token: token,
      name: user.name,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

// @desc sign up for news letter
// @route POST /api/users
// @access Public

const newsLetter = asyncHandler(async (req, res) => {
  const { newsletteremail } = req.body;

  // mailchimp.setConfig({
  //   apiKey: "d2726c9283ee9443d53213b3f82377b0-us10",
  //   server: "us10",
  // });

  mailchimp.setConfig({
    // apiKey: "cc87fb080e63486f0c888d4dd085d1a2-us8",
    // server: "us8",
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });

  // const listId = "97c67e99a7";
  // const subscribingUser = {
  //   firstName: "Devotee",
  //   lastName: "HTKY",
  //   email: newsletteremail,
  // };
  // const listId = "f369c9d1a7";

  const subscribingUser = {
    firstName: "Dear",
    lastName: "Devotee",
    email: newsletteremail,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_LIST_ID,
        {
          email_address: subscribingUser.email,
          status: "pending",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
          },
        }
      );
      res
        .status(200)
        .send({ message: "Check your email inbox or spam folder" });
    } catch (e) {
      if (e.status === 400) {
        res
          .status(400)
          .send({ message: "Signed Up! This email already exists" });
      } else if (e.status > 300) {
        res
          .status(500)
          .send({ message: "Something went wrong. Please try again latter" });
      }
    }
  }

  run();
});

// @desc stripe payment intent
// @route POST /api/users/paymentIntent
// @access private

function calculateOrderAmount(cartItems) {
  return (
    cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0) * 100
  );
}

const paymentIntent = asyncHandler(async (req, res) => {
  // const { cartItems, description, receipt_email, shipping } = req.body
  const { cartItems, description, receipt_email, name } = req.body;

  let paymentIntent;

  try {
    paymentIntent = await stripe(
      process.env.REACT_APP_STRIPE_SECRET_KEY
    ).paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "usd",
      description,
      payment_method_types: ["card"],
      receipt_email,
      // shipping,
    });

    console.log("payment Intent clientSecret", paymentIntent.client_secret);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occured, unable to create payment intent " });
  }
});

// @desc Create a new user Admin functionality
// @route POST /api/users
// @access Private/Admin

const createUser = asyncHandler(async (req, res) => {
  const number = Date.now();
  const email = "email" + number + "@email.com";

  const user = new User({
    name: "Enter Your Name",
    gotram: "Enter Your gotram",
    phone: "Enter phone number",
    email: email,
    password: "Srisai@2022",
  });

  const createdUser = await user.save();

  if (!createdUser) {
    res.status(500);
    throw new Error("Something went wrong adding new user");
  } else {
    res.status(201).json(createdUser);
  }
});

// @desc send contactus email
// @route POST /api/users
// @access Public

const contactUs = async (req, res) => {
  if (!`${req.body.email}`) {
    return res.status(403).send({
      message: "Please double check your email and resubmit!",
    });
  } else {
    const body = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: "Email from a Devotee, Please send a reply!",
      html: `<h2>Dear Saidham Team </h2>
     
      <p style="margin-top: 35px;">${req.body.message}</p>
       
      <p style="margin-bottom:0px;">Thank you</p>
      <strong>${req.body.name}</strong> <br>
       <strong>${req.body.email}</strong>
     
           `,
    };

    const message = "Please double check your email and resubmit!";
    sendNodeEmail(body, res, message);

    if (`${req.body.email}`) {
      return res.status(200).send({
        message: "Thank you for contacting us!",
      });
    }
  }
};

export {
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
};
