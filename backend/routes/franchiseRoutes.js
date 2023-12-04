// These are routes additionally needed for franchise
import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, protectVerifyStatus } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import Worker from "../models/workerModel.js";
import Package from "../models/packageModel.js";

import Randomstring from "randomstring";
import { populate } from "dotenv";
// There will be N number of user pins available to someone who bought franchise

// List N number of pins
// Get: pins listed to user
// Access to user
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("packageChosen");

    let packageType = user.packageChosen.schemeType;

    if (user) {

        res.status(201).json({
          userStatus: user.userStatus,
          pinsLeft: user.pinsLeft,
          packageType,
          sts: "01",
          msg: "Pins fetched successfully!",
        });
        
    } else {
      res.status(404).json({
        sts: "00",
        msg: "User not found!",
      });
    }
  })
);

// Use the PIN to sell to worker(Electrician, Teacher etc.)
// POST: The worker details will be send to Seclob
// Access to user
router.post(
  "/sell-pin",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { name, phone, email, profession, district } = req.body;

    const user = await User.findById(userId).populate("packageChosen");

    if (user) {
      if (user.pinsLeft > 0) {
        const newWorker = await Worker.create({
          addedBy: user._id,
          name,
          email,
          phone,
          profession,
          district,
        });

        if (newWorker) {
          user.pinsLeft = user.pinsLeft - 1;
          await user.save();
          res.status(201).json({
            sts: "01",
            msg: "Member added successfully!",
          });
        } else {
          res.status(400).json({
            sts: "00",
            msg: "Some error occured. Please try again!",
          });
        }
      } else {
        res.status(400).json({
          sts: "00",
          msg: "Failed adding. No PINs left!",
        });
      }
    } else {
      res.status(400).json({
        sts: "00",
        msg: "No user found. Check if you are logged in!",
      });
    }
  })
);

// Use the PIN to Register new member
// POST: The member will as the normal members
// Access to user
const generateRandomString = () => {
  const baseString = "SSG";
  const randomDigits = Math.floor(Math.random() * 999999);
  return baseString + randomDigits.toString();
};

router.post(
  "/register",
  protect,
  asyncHandler(async (req, res) => {
    const sponser = req.user._id;

    const userStatus = "approved";

    const sponserUser = await User.findById(sponser).populate("packageChosen");

    const packageType = sponserUser.packageChosen.schemeType;

    if (packageType === "franchise") {
      if (sponserUser && sponserUser.pinsLeft > 0) {
        const ownSponserId = generateRandomString();

        const { name, email, phone, address, password, packageSelected } =
          req.body;

        const existingUser = await User.findOne({
          $or: [{ email }, { phone }],
        });

        if (existingUser) {
          res
            .status(400)
            .json({ sts: "00", msg: "User has already registered!" });
        }

        const unrealisedEarning = [];
        const children = [];
        const packageTaken = await Package.findById(packageSelected);
        const pinsLeft = packageTaken.usersCount + packageTaken.addOnUsers;

        const user = await User.create({
          sponser,
          name,
          email,
          phone,
          address,
          password,
          packageChosen: packageSelected,
          pinsLeft,
          unrealisedEarning,
          ownSponserId,
          userStatus,
          children,
        });
        if (user) {
          sponserUser.children.push(user._id);
          sponserUser.pinsLeft = sponserUser.pinsLeft - 1;
          await sponserUser.save();

          res.status(200).json({
            userStatus: sponserUser.userStatus,
            _id: user._id,
            sponser: user.sponser,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            packageChosen: user.packageChosen,
            ownSponserId: user.ownSponserId,
            pinsLeft: sponserUser.pinsLeft,
          });
        } else {
          res.status(401).json({
            sts: "00",
            msg: "Registration failed. Please try again!",
          });
        }
      } else {
        res.status(401).json({
          sts: "00",
          msg: "You have no PINs left!",
        });
      }
    } else {
      res.status(401).json({
        sts: "00",
        msg: "You are not a franchise package holder!",
      });
    }
  })
);

// Get the activated PINS (added workers)
// GET: Get the activated pin members to user
// Access to user
router.get(
  "/get-activated-pins",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const activatedPins = await Worker.find({ addedBy: userId });

    console.log(activatedPins);
    if (activatedPins) {
      res.status(200).json({
        activatedPins,
        userStatus: user.userStatus,
      });
    } else {
      res.status(404).json({
        sts: "00",
        msg: "Couldn't fetch any activated pins!",
      });
    }
  })
);

export default router;
