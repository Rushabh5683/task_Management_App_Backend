import { AuthService } from "../services/authService.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

export const adminSignup = async (req, res) => {
  try {
    const data = await AuthService.adminSignup(req.body);
    sendSuccess(res, data, "Admin registered", 201);
  } catch (e) {
    sendError(res, e.message);
  }
};

export const login = async (req, res) => {
  try {
    const data = await AuthService.login(req.body);
    sendSuccess(res, data, "Login successful");
  } catch (e) {
    sendError(res, e.message, 401);
  }
};
