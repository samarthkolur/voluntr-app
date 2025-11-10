import mongoose, { Schema, models } from "mongoose";

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  googleFormLink: { type: String, required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["volunteer", "ngo"],
      required: true,
    },
    events: [eventSchema],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
