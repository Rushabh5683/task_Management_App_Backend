import express from "express";
import {
  createTask,
  getAllCompanyTasksForAdmin,
  getCompanyTasks,
  getMyTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";

import { verifyAccessToken } from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

// ADMIN
router.post("/", verifyAccessToken, adminOnly, createTask);
router.get("/company", verifyAccessToken, adminOnly, getCompanyTasks);
router.get("/", verifyAccessToken, adminOnly, getAllCompanyTasksForAdmin);

// EMPLOYEE
router.get("/my", verifyAccessToken, getMyTasks);
router.patch("/:id/status", verifyAccessToken, updateTaskStatus);

export default router;
