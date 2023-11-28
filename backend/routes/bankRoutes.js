import express from "express";
const router = express.Router();

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

import multer from "multer";

// POST: Add bank details
// Access to admin/user

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  protect,
  upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),
  asyncHandler(async (req, res) => {
    if (req.files < 2) {
      res.status(400).json({ message: "Please upload files" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    const { holderName, accountNum, ifscCode, bank, aadhar, pan } = req.body;

    if (user) {
      user.bankDetails.aadharPhoto = req.files.image1[0].filename;
      user.bankDetails.panPhoto = req.files.image2[0].filename;
      user.bankDetails.holderName = holderName;
      user.bankDetails.accountNum = accountNum;
      user.bankDetails.ifscCode = ifscCode;
      user.bankDetails.bank = bank;
      user.bankDetails.aadhar = aadhar;
      user.bankDetails.pan = pan;

      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(201).json({
          updatedUser,
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

export default router;
