import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { protectVerifyStatus } from "../middleware/authMiddleware.js";

// Generate random string fro temperory reference ID
const generateRandomString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

// GET: Fetch wallet amount
// Access to admin/user
router.get(
  "/",
  protectVerifyStatus,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        earning: user.earning,
        unrealisedEarning: user.unrealisedEarning,
        transactionHistory: user.transactions,
        sts: "01",
        msg: "Success",
      });
    } else {
      res.status(401).json({ sts: "00", msg: "User not found" });
    }
  })
);

// POST: Withdraw from wallet
// Access to user
router.post(
  "/withdraw",
  protectVerifyStatus,
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      if (user.earning > 500) {
        if (amount <= user.earning) {
          user.transactions.push({
            referenceID: generateRandomString(5),
            amount: amount,
            status: "Pending",
          });

          const transactionUpdate = await user.save();
          
          if (transactionUpdate) {
            res.status(200).json({
              sts: "01",
              msg: "Withdrawal request sent. The amount will be credited to your account within 48 hours!",
              transactions: user.transactions
            });
          } else {
            res.status(401).json({
              sts: "00",
              msg: "Transaction failed. Please try again!",
            });
          }
        } else {
          res.status(401).json({
            sts: "00",
            msg: "Insufficient balance!",
          });
        }
      } else {
        res.status(401).json({
          sts: "00",
          msg: "Your withdrawal request cannot be processed as your wallet balance is below ₹500!",
        });
      }
    } else {
      res.status(401).json({ sts: "00", msg: "User not found!" });
    }
  })
);

export default router;
