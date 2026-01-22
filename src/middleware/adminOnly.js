import { ROLES } from "../config/constants/roles.js";

export const adminOnly = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return res
      .status(403)
      .json({ success: false, message: "Admin access only" });
  }
  next();
};
