import express from "express";
import path from "path";
import cors from 'cors';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());

import userRoutes from "./routes/userRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import commissionRoutes from "./routes/commissionRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
// import pinRoutes from "./routes/pinRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import franchiseRoutes from "./routes/franchiseRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";

//dotenv
import dotenv from "dotenv";
dotenv.config();
//dotenv

import cookieParser from "cookie-parser";

// Database connection
import connectDB from "./config/db.js";
connectDB();
// Database connection

app.use(express.json());
app.use(cookieParser());

// Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// Uploads

// API Points
app.get("/", (req, res) => {
  res.status(201).json("Running");
});

app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/commission", commissionRoutes);
app.use("/api/salary", salaryRoutes);
// app.use("/api/pins", pinRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/bank", bankRoutes);
// API Points

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 6001;

app.listen(port, () => console.log(`Server running in ${port}`));
