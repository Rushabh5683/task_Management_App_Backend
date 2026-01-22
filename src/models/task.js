import mongoose from "mongoose";
import { TASK_STATUS } from "../config/constants/taskStatus.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.ASSIGNED,
    },

    // 🔥 STATUS CHANGE TIMESTAMPS
    statusTimestamps: {
      assignedAt: {
        type: Date,
        default: Date.now,
      },
      inProgressAt: Date,
      completedAt: Date,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
