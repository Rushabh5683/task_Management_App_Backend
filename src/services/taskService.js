import Task from "../models/task.js";
import { TASK_STATUS } from "../config/constants/taskStatus.js";

export class TaskService {
  // Admin assigns task
  static async createTask(data, adminUser) {
  const task = await Task.create({
    title: data.title,
    description: data.description,
    assignedTo: data.assignedTo,
    companyId: adminUser.companyId,
    createdBy: adminUser.id,
    status: TASK_STATUS.ASSIGNED,
    statusTimestamps: {
      assignedAt: new Date(),
    },
  });

  await task.populate([
    { path: "assignedTo", select: "name email" },
    { path: "createdBy", select: "name" }
  ]);

  return task;
}


// Admin views all tasks of company (with optional filters)
static async getCompanyTasksForAdmin(companyId, filters = {}) {
  const query = { companyId };

  // Optional status filter
  if (filters.status) {
    query.status = filters.status;
  }

  return Task.find(query)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });
}



  // Admin views all tasks of company
  static async getCompanyTasks(companyId) {
    return Task.find({ companyId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");
  }

  // Employee views own tasks
  // Employee views own tasks
static async getEmployeeTasks(userId) {
  return Task.find({ assignedTo: userId })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name");
}


  // Employee updates task status
  static async updateTaskStatus(taskId, userId, newStatus) {
    const task = await Task.findOne({
      _id: taskId,
      assignedTo: userId,
    });

    if (!task) throw new Error("Task not found or access denied");

    // 🔒 STATUS FLOW VALIDATION
    if (
      (task.status === TASK_STATUS.ASSIGNED &&
        newStatus !== TASK_STATUS.IN_PROGRESS) ||
      (task.status === TASK_STATUS.IN_PROGRESS &&
        newStatus !== TASK_STATUS.DONE)
    ) {
      throw new Error("Invalid task status transition");
    }

    task.status = newStatus;

    // 🔥 SET TIMESTAMPS
    if (newStatus === TASK_STATUS.IN_PROGRESS) {
      task.statusTimestamps.inProgressAt = new Date();
    }

    if (newStatus === TASK_STATUS.DONE) {
      task.statusTimestamps.completedAt = new Date();
    }

    return task.save();
  }
}
