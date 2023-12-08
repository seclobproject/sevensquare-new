import express from "express";
const router = express.Router();
import Randomstring from "randomstring";
import { protect, superAdmin } from "../middleware/authMiddleware.js";

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Worker from "../models/workerModel.js";

router.post(
  "/get-profile",
  protect,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("packageChosen");

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({
        sts: "00",
        msg: "User not found",
      });
    }
  })
);

// GET All pins to admin
router.get(
  "/get-all-pins",
  superAdmin,
  asyncHandler(async (req, res) => {
    const pins = await Worker.find().populate("addedBy");

    if (pins) {
      res.status(200).json(pins);
    } else {
      res.status(404).json({ msg: "No PINS found!" });
    }
  })
);

// Add bonus
router.post(
  "/add-bonus",
  protect,
  asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.body.user_Id);

    const amount = parseInt(req.body.amount, 10);

    if (user) {

      user.earning = user.earning + amount;
      user.allTransactions.push({
        sponserID: "Admin",
        name: req.body.note,
        amount,
        status: "approved",
      });
      
      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(201).json({ msg: "Added successfully!" });
      }
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  })
);

export default router;
