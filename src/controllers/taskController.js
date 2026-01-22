import { TaskService } from "../services/taskService.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

export const createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body, req.user);
    sendSuccess(res, task, "Task assigned", 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

export const getCompanyTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getCompanyTasks(req.user.companyId);
    sendSuccess(res, tasks, "Company tasks fetched");
  } catch (err) {
    sendError(res, err.message);
  }
};

export const getAllCompanyTasksForAdmin = async (req, res) => {
  try {
    const tasks = await TaskService.getCompanyTasksForAdmin(
      req.user.companyId,
      req.query 
    );

    sendSuccess(res, tasks, "All company tasks fetched");
  } catch (err) {
    sendError(res, err.message);
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getEmployeeTasks(req.user.id);
    sendSuccess(res, tasks, "My tasks fetched");
  } catch (err) {
    sendError(res, err.message);
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const task = await TaskService.updateTaskStatus(
      req.params.id,
      req.user.id,
      req.body.status
    );
    sendSuccess(res, task, "Task status updated");
  } catch (err) {
    sendError(res, err.message);
  }
};
