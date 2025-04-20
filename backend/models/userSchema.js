import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true } // Add timestamps option
);

const userModel = mongoose.model('user', userSchema);

export default userModel;