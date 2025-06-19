const { connectDB } = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const dataRoute = require("./Routes/DataRoute");
const cropRoute = require("./Routes/CropRoute");
const postRoute = require("./Routes/PostRoute");
const commentRoute = require("./Routes/CommentRoute");
const  PORT = process.env.PORT || 4999;

const app = express();

// Middleware - IMPORTANT: These must be defined BEFORE the routes
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",  
      "https://harvesthub-client.vercel.app",  
      "https://harvesthub-ro0t.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/", authRoute);
app.use("/", dataRoute);
app.use("/", cropRoute);
app.use("/", postRoute);
app.use("/", commentRoute);

app.get("/", (req, res) => {
  res.json({ message: "HarvestHub API is running" });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});