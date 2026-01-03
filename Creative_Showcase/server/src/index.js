import dotenv from "dotenv";
import path from "path";

// Load env
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman
      if (!origin) return callback(null, true);

      // allow all Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // allow local development
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Routes
app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.get("/", (_, res) => {
  res.send("Creative Showcase API running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
