import express from "express";
const router = express.Router();
import Randomstring from "randomstring";

import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  protect,
  superAdmin,
  protectVerifyStatus,
} from "../middleware/authMiddleware.js";
import multer from "multer";
import Package from "../models/packageModel.js";
// import upload from "../middleware/fileUploadMiddleware.js";

// Register new user
// POST: By admin/sponser

// Function to find the highest unrealised commission and add it to wallet
const unrealisedToWallet = (arr) => {
  if (arr.length === 0) {
    return 0;
  }
  const highestNumber = Math.max(...arr);
  const highestNumbers = arr.filter((num) => num === highestNumber);
  const sum = highestNumbers.reduce((acc, num) => acc + num, 0);
  return sum;
};

// Function to split salary(14.75) to every sponsers
const giveSalary = async (user) => {
  try {
    let sponser = user;

    while (sponser) {
      sponser = await User.findById(sponser.sponser);
      if (!sponser) {
        break;
      }
      sponser.unrealisedSalary = (sponser.unrealisedSalary || 0) + 14.75;
      await sponser.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      "Some error occured while salary giving. Please check again!"
    );
  }
};

const generateRandomString = () => {
  const baseString = "SSG";
  const randomDigits = Math.floor(Math.random() * 999999);
  return baseString + randomDigits.toString();
};

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const sponser = req.user._id;

    const userStatus = "pending";

    const sponserUser = await User.findById(sponser);

    const ownSponserId = generateRandomString();

    const { name, email, phone, address, packageChosen, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });

    if (existingUser || existingUserByPhone) {
      res.status(400);
      throw new Error("User already exists!");
    }

    let screenshot = null;
    let referenceNo = null;

    if (req.body.screenshot && req.body.referenceNo) {
      screenshot = req.body.screenshot;
      referenceNo = req.body.referenceNo;
    }

    const earning = 0;
    const unrealisedEarning = [];
    const children = [];

    if (packageChosen) {
      const packageSelected = await Package.findById(packageChosen);

      let pinsLeft;
      if (packageSelected) {
        pinsLeft = packageSelected.usersCount + packageSelected.addOnUsers;
      }
    }

    const user = await User.create({
      sponser,
      name,
      email,
      phone,
      address,
      packageChosen,
      password,
      ownSponserId,
      screenshot,
      referenceNo,
      earning,
      unrealisedEarning,
      userStatus,
      children,
      pinsLeft,
    });

    if (user) {
      if (sponserUser) {
        sponserUser.children.push(user._id);

        await giveSalary(user);

        if (
          sponserUser.children.length === 2 ||
          sponserUser.children.length === 3
        ) {
          const unrealisedAmount = unrealisedToWallet(
            sponserUser.unrealisedEarning
          );

          sponserUser.earning = sponserUser.earning + unrealisedAmount;

          const highestNumber = Math.max(...sponserUser.unrealisedEarning);

          const remainingNumbers = sponserUser.unrealisedEarning.filter(
            (num) => num !== highestNumber
          );

          sponserUser.unrealisedEarning = remainingNumbers;
        }

        await sponserUser.save();

        res.json({
          _id: user._id,
          sponser: user.sponser,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          packageChosen: user.packageChosen,
          ownSponserId: user.ownSponserId,
          screenshot: user.screenshot,
          referenceNo: user.referenceNo,
          earning: user.earning,
          pinsLeft: user.pinsLeft,
          unrealisedEarning: user.unrealisedEarning,
          children: user.children,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin,
          userStatus: user.userStatus,
        });
      } else {
        res.status(400);
        throw new Error("Some error occured. Make sure you are logged in!");
      }
    } else {
      res.status(400);
      throw new Error("Registration failed. Please try again!");
    }
  })
);

// Login user/admin
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { userId: user._id },
        "secret_of_jwt_for_sevensquare_5959",
        {
          expiresIn: "1d",
        }
      );

      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== "development",
      //   sameSite: "strict",
      //   maxAge: 1 * 24 * 60 * 60 * 1000,
      // });

      res.status(200).json({
        _id: user._id,
        sponser: user.sponser,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        packageChosen: user.packageChosen,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
        ownSponserId: user.ownSponserId,
        screenshot: user.screenshot,
        referenceNo: user.referenceNo,
        earning: user.earning,
        pinsLeft: user.pinsLeft,
        unrealisedEarning: user.unrealisedEarning,
        userStatus: user.userStatus,
        children: user.children,
        token_type: "Bearer",
        access_token: token,
        sts: "01",
        msg: "Login Success",
      });
    } else {
      res.status(401).json({ sts: "00", msg: "Login failed" });
      // throw new Error("Invalid email or password");
    }
  })
);

// Set up Multer storage
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     const uniqueFilename = Date.now() + "-" + path.extname(file.originalname);
//     cb(null, uniqueFilename);
//   },
// });

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

// POST: User verification
// After first/fresh user login
router.post(
  "/verify-user",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const { referenceNo } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (user) {
      user.screenshot = req.file.filename;
      user.referenceNo = referenceNo;

      const updatedUser = await user.save();
      if (updatedUser) {
        res
          .status(201)
          .json({ updatedUser, sts: "01", msg: "User verification success!" });
      } else {
        res
          .status(400)
          .json({ sts: "00", msg: "Verification failed. Please try again!" });
      }
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  })
);

// Verify user by admin after the payment screenshot received
// POST: Only for admin/sponser
const splitCommissions = async (user, amount, levels, percentages) => {
  if (!user || levels === 0) {
    return;
  }

  const commission = (percentages[0] / 100) * amount;
  const sponser = await User.findById(user.sponser);

  if (sponser) {
    if (sponser.children.length >= 4) {
      sponser.earning = sponser.earning + commission;
    } else if (sponser.children.length === 2 && percentages[0] === 8) {
      sponser.earning = sponser.earning + commission;
    } else if (sponser.children.length === 3 && percentages[0] === 5) {
      sponser.earning = sponser.earning + commission;
    } else {
      sponser.unrealisedEarning.push(commission);
    }

    await sponser.save();
    splitCommissions(sponser, amount, levels - 1, percentages.slice(1));
  }
};

router.post(
  "/verify-user-payment",
  superAdmin,
  asyncHandler(async (req, res) => {
    // const sponserUserId = req.user._id;

    const { userId } = req.body;
    const user = await User.findById(userId);

    // const sponseredUsers = await User.findById(user).populate({
    //   path: "children",
    // });

    // const theUser = sponseredUsers.children.find((child) =>
    //   child._id.equals(userId)
    // );

    if (user) {
      user.userStatus = "approved";

      const updatedUser = await user.save();

      if (updatedUser) {
        const sponserUser = await User.findById(user.sponser);

        const packageSelected = await user.populate({
          path: "packageChosen",
        });

        //NEW
        const percentages = [8, 5, 4, 3, 2, 1];
        //NEW
        const levels = Math.min(percentages.length, 7);
        const packageAmount = packageSelected.packageChosen.amountExGST;
        //NEW
        const sponserCommission = (25 / 100) * packageAmount;
        sponserUser.earning = sponserUser.earning + sponserCommission;
        await sponserUser.save();

        splitCommissions(sponserUser, packageAmount, levels, percentages);
      }

      res
        .status(200)
        .json({ updatedUser, message: "Commissions splitted successfully!" });
    } else {
      res.status(401);
      throw new Error("Can't find this user. Please check again!");
    }
  })
);

// GET: All users to Super admin
router.get(
  "/get-users",
  superAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().populate("packageChosen");
    res.json(users);
  })
);

// GET: All users to admin (under that specific admin with his referralID)
router.get(
  "/get-my-users",
  protect,
  protectVerifyStatus,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const users = await User.findById(userId).populate("children");

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    const childrenArray = users.children || [];

    // childrenArray.forEach((child) => {
    //   const packageChosen =
    // })

    if (childrenArray.length === 0) {
      res
        .status(401)
        .res({ sts: "00", message: "No members found under you!" });
    } else {
      res.status(200).json({ children: childrenArray });
    }
  })
);

// GET: Get your users by ID
router.get(
  "/get-user-by-id/:id",
  protectVerifyStatus,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).populate("children");

    const childrenArray = user.children || [];

    const updatedArray = await Promise.all(
      childrenArray.map(async (child) => {
        const packageSelected = await Package.findById(
          child.packageChosen
        ).lean();

        if (packageSelected) {
          const modifiedObject = {
            ...child,
            packageSelected: packageSelected.name,
          };

          // Remove Mongoose metadata
          delete modifiedObject.__v;
          delete modifiedObject._id;
          delete modifiedObject.$__;
          delete modifiedObject.$isNew;

          return modifiedObject;
        } else {
          return null;
        }
      })
    );

    let members;

    if (updatedArray) {
      members = updatedArray.map((obj) => ({
        ...obj._doc,
        packageSelected: obj.packageSelected,
      }));
    }

    if (members) {
      res.status(200).json({
        sponserUser: user,
        members,
      });
    } else {
      res.status(400).json({ sts: "00", message: "Members not found" });
    }
  })
);

// PUT: Edit user profile
// Access to admin
router.put(
  "/edit-profile",
  protectVerifyStatus,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { name, email, phone, address, password } = req.body;

    const user = await User.findById(userId);

    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.address = address;
      user.password = password;
    }
    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json({
        name,
        email,
        phone,
        address,
      });
    } else {
      res
        .status(404)
        .json({ message: "Error occured! Please verify you are logged in!" });
    }
  })
);

// POST: Fetch profile of the user
// Access to admin/user
router.post(
  "/fetch-profile",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("packageChosen");

    if (user) {
      res.json({
        _id: user._id,
        sponser: user.sponser,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        ownSponserId: user.ownSponserId,
        screenshot: user.screenshot,
        referenceNo: user.referenceNo,
        earning: user.earning,
        unrealisedEarning: user.unrealisedEarning,
        userStatus: user.userStatus,
        packageChosen: user.packageChosen.amount,
        sts: "01",
        msg: "Profile fetched successfully",
      });
    } else {
      res.status(401).json({ sts: "00", msg: "User not found" });
    }
  })
);

// PUT: Change password
// Access to admin/user
router.put(
  "/change-password",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const { password } = req.body;
    if (user) {
      user.password = password;
      const updatedUser = user.save();

      if (updatedUser) {
        console.log(updatedUser);
        res
          .status(200)
          .json({ sts: "01", msg: "Password changed successfully!" });
        }else{
        res
          .status(401)
          .json({ sts: "00", msg: "Password changing failed!" });

      }
    }
  })
);

export default router;
