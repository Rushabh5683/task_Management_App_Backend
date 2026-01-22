import express from "express";
import { createEmployee, getEmployees } from "../controllers/userController.js";
import { verifyAccessToken } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/", verifyAccessToken, adminOnly, createEmployee);
router.get("/employees", verifyAccessToken, adminOnly, getEmployees);

export default router;
