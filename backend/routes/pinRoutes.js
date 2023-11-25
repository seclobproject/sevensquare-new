import express from "express";
const router = express.Router();

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

import Pin from "../models/pinModel.js";

// POST: Show the number of PINS available to sell
// Accessable to admin
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const packageSelected = await User.findById(userId).populate(
      "packageChosen"
    );

    if (packageSelected) {
      const totalPins =
        packageSelected.packageChosen.usersCount +
        packageSelected.packageChosen.addOnUsers;
      res
        .status(200)
        .json({ totalPins, sts: "01", message: "Delivered successfully." });
    } else {
      res.status(400).json({
        sts: "00",
        message: "Can't fetch the PINs. Check if you are logged in!",
      });
    }
  })
);

// POST: Use PIN/Add new User
// Accessible to user
router.post(
  "/add-user",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("packageChosen");

    const { name, email, phone, district, profession } = req.body;

    if (user.packageChosen.usersCount > 0) {
      user.packageChosen.usersCount = user.packageChosen.usersCount - 1;
    } else {
      if (user.packageChosen.addOnUsers > 0) {
        user.packageChosen.addOnUsers = user.packageChosen.addOnUsers - 1;
      } else {
        res
          .status(401)
          .json({ sts: "00", message: "You used all your Pins!!!" });
      }
    }

    const newPin = await Pin.create({
      addedBy: userId,
      name,
      email,
      phone,
      district,
      profession,
    });

    if (newPin) {
      user.save();
      res.status(201).json({
        name: newPin.name,
        email: newPin.email,
        phone: newPin.phone,
        district: newPin.district,
        profession: newPin.profession,
        totalPinsLeft:
          user.packageChosen.usersCount + user.packageChosen.addOnUsers,
        sts: "01",
        message: "Pin created successfully!",
      });
    } else {
      res.status(401).json({ sts: "00", message: "Pin creation failed" });
    }
    
  })
);

export default router;
