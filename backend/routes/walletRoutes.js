import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import {
  protect,
  protectVerifyStatus,
  superAdmin,
} from "../middleware/authMiddleware.js";

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
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        earning: user.earning,
        userStatus: user.userStatus,
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
  protect,
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const TDSAmount = amount * 0.1;

    const lastAmount = amount - TDSAmount;

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      if (user.earning >= 450) {
        if (lastAmount <= user.earning) {
          user.transactions.push({
            referenceID: generateRandomString(5),
            amount: amount,
            TDSAmount,
            lastAmount,
            status: "Pending",
          });

          const transactionUpdate = await user.save();

          if (transactionUpdate) {
            res.status(200).json({
              sts: "01",
              msg: "Withdrawal request sent. The amount will be credited to your account within 48 hours!",
              transactions: user.transactions,
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

// POST: Get all transactions to User admin
// Access to super admin
router.get(
  "/transactions",
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users) {
      let result = [];

      for (let user of users) {
        if (user.transactions.length !== 0) {
          result.push({
            userId: user._id,
            bankDetails: user.bankDetails,
            sponserID: user.ownSponserId,
            username: user.name,
            email: user.email,
            phone: user.phone,
            transactions: user.transactions,
          });
        }
      }

      res.status(200).json(result);
    } else {
      res.status(401).json({ sts: "00", msg: "Can't fetch users!" });
    }
  })
);

// Approve Transaction
router.post(
  "/verify-transaction",
  protect,
  asyncHandler(async (req, res) => {
    const { userId, transId } = req.body;

    const user = await User.findById(userId);

    if (user) {
      const transaction = user.transactions.map((trans) => {
        if (trans._id == transId) {
          trans.status = "Approved";
        }
      });

      const updatedTrans = await user.save();

      if (updatedTrans) {
        res.status(201).json({ sts: "01", msg: "Approval successful." });
      } else {
        res
          .status(401)
          .json({ sts: "00", msg: "Approval failed. Please try again" });
      }
    } else {
      res.status(401).json({ sts: "00", msg: "User not found!" });
    }
  })
);

// Reject Transaction
router.post(
  "/reject-transaction",
  protect,
  asyncHandler(async (req, res) => {
    const { userId, transId } = req.body;

    const user = await User.findById(userId);

    if (user) {
      const transaction = user.transactions.map((trans) => {
        if (trans._id == transId) {
          trans.status = "Rejected";
        }
      });

      const updatedTrans = await user.save();

      if (updatedTrans) {
        res.status(201).json({ sts: "01", msg: "Transaction rejected" });
      } else {
        res
          .status(401)
          .json({ sts: "00", msg: "Rejection failed. Please try again" });
      }
    } else {
      res.status(401).json({ sts: "00", msg: "User not found!" });
    }
  })
);

// GET: All transactions (All commissions)
// Access to user
router.get(
  "/all-transactions",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      if (user.allTransactions.length > 0) {
        let result = [];

        for (let transaction of user.allTransactions) {
          const date = new Date(transaction.createdAt);
          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };

          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options
          ).format(date);
          result.push({ transaction, formattedDate });
        }

        res.status(200).json({
          sts: "01",
          msg: "Success",
          result,
          userStatus: user.userStatus,
        });
      } else {
        res.status(200).json({
          sts: "01",
          msg: "No transactions present!",
          userStatus: user.userStatus,
        });
      }
    } else {
      res.status(404).json({
        sts: "00",
        msg: "User not found!",
        userStatus: user.userStatus,
      });
    }
  })
);

export default router;
