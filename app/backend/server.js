import express from "express";
import { connect } from "mongoose";
import { json } from "body-parser";
import authRoutes from "D:/sih24/postdel/app/backend/auth.js";

const app = express();

app.use(json());

// MongoDB connection
connect("mongodb://localhost:27017/OptideliverSystem/Postman", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
