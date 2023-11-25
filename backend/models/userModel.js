import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transactionSchema = new mongoose.Schema(
  {
    referenceID: String,
    amount: Number,
    status: String
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    sponser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    packageChosen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    ownSponserId: {
      type: String,
      required: true,
    },
    screenshot: {
      type: String,
      default: null
    },
    referenceNo: {
      type: String,
      default: null
    },
    earning: {
      type: Number,
      default: 0,
    },
    unrealisedSalary: {
      type: Number,
      default: 0,
    },
    unrealisedEarning: [
      {
        type: Number,
      },
    ],
    pinsLeft: {
      type: Number,
      required: true,
      default: 1
    },
    transactions: [transactionSchema],
    userStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Doing encryption before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
