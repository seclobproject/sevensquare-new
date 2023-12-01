import express from "express";
const router = express.Router();

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

import uploadMiddleware from "../middleware/uploadMiddleware.js";

// POST: Add bank details
// Access to admin/user

router.post(
  "/",
  protect,
  uploadMiddleware,
  asyncHandler(async (req, res) => {
    const file1 = req.files["file1"][0];
    const file2 = req.files["file2"][0];

    const userId = req.user._id;
    const user = await User.findById(userId);
    const { holderName, accountNum, ifscCode, bank, aadhar, pan } = req.body;

    if (user) {
      
      user.bankDetails = {
        aadharPhoto: file1.filename,
        panPhoto: file2.filename,
        holderName: holderName,
        accountNum: accountNum,
        ifscCode: ifscCode,
        bank: bank,
        aadhar: aadhar,
        pan: pan,
      };

      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(201).json({
          bankDetails: updatedUser.bankDetails,
          sts: "01",
          msg: "Bank details added successfully!",
        });
      } else {
        res.status(400).json({
          sts: "00",
          msg: "Bank details adding failed. Please try again!",
        });
      }
    } else {
      res.status(401).json({ sts: "00", msg: "User not found!" });
    }
  })
);

// GET Bank details
// ACCESS to user
router.get(
  "/get-details",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      if (user.bankDetails) {
        res.status(200).json({
          bankDetails: user.bankDetails,
          sts: "01",
          msg: "Fetched successfully",
        });
      } else {
        res.status(404).json({ sts: "00", msg: "Bank details not found!" });
      }
    } else {
      res.status(404).json({ sts: "00", msg: "User not found" });
    }
  })
);

export default router;
