import dotenv from "dotenv";
import path from "path";

// Load env
dotenv.config({ path: path.join(process.cwd(), ".env") });

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import cloudinary from "./config/cloudinary.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Routes
app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.get("/", (_, res) => {
  res.send("Creative Showcase API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
