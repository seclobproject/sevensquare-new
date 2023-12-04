import express from "express";
const router = express.Router();
import Randomstring from "randomstring";
import { protect, superAdmin } from "../middleware/authMiddleware.js";

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

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

export default router;