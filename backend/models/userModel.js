import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gotra: {
      type: String,
      required: false,
    },
    nakshatra: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    newsletter: {
      type: Boolean,
      required: false,
      default: false,
    },
    // passwordConfirm: {
    // 	type: String,
    // 	select: false,
    // },
    member: {
      type: Boolean,
      required: false,
      default: false,
    },
    memberActiveDate: {
      type: String,
      required: false,
    },

    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },

    passwordChangedAt: {
      type: Date,
    },

    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//verify user entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
// 	if (this.passwordChangedAt) {

// 	}

// 	return false
// }
//userSchema.pre will execute before saving anything to the document. In this case password is encrypted
userSchema.pre("save", async function (next) {
  //only run this function if the password was actually modified
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  // This is to make sure JWT is issued after the password change.
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // The issued token expires in 20 minutes
  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
