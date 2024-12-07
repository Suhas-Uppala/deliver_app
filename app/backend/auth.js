import { Router } from "express";
import { findOne } from "D:/sih24/postdel/app/backend/server.js";
const router = Router();

router.post("/login", async (req, res) => {
  const { postman_id, password } = req.body;

  try {
    const user = await findOne({ postman_id, password });
    if (user) {
      return res.status(200).json({ success: true, message: "Login successful!" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error!" });
  }
});

export default router;
