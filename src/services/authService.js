import Company from "../models/company.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLES } from "../config/constants/roles.js";

export class AuthService {
  static async adminSignup({ companyName, name, email, password }) {
    const company = await Company.create({ name: companyName });

    const user = await User.create({
      name,
      email,
      password,
      role: ROLES.ADMIN,
      companyId: company._id,
    });

    return user;
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role, companyId: user.companyId },
      process.env.JWT_SECRET
    );

    return { token };
  }
}
