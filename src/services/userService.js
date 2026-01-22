import User from "../models/user.js";
import { ROLES } from "../config/constants/roles.js";

export class UserService {
  static async createEmployee({ name, email, password }, companyId) {
    const employee = await User.create({
      name,
      email,
      password,
      role: ROLES.EMPLOYEE,
      companyId,
    });

    return employee;
  }

  static async getEmployeesByCompany(companyId) {
    return User.find({ companyId, role: ROLES.EMPLOYEE });
  }
}
