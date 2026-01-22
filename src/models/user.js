import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../config/constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

// 🔒 SAME EMAIL CAN EXIST IN DIFFERENT COMPANIES
userSchema.index({ email: 1, companyId: 1 }, { unique: true });

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
