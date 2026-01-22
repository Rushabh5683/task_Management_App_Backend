import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // 🔒 NO DUPLICATE COMPANIES
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
