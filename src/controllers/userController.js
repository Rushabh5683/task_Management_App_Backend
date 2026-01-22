import { UserService } from "../services/userService.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

export const createEmployee = async (req, res) => {
  try {
    const employee = await UserService.createEmployee(
      req.body,
      req.user.companyId
    );
    sendSuccess(res, employee, "Employee created", 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await UserService.getEmployeesByCompany(
      req.user.companyId
    );
    sendSuccess(res, employees, "Employees fetched");
  } catch (err) {
    sendError(res, err.message);
  }
};
