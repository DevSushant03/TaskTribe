import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  surname: { type: String, default: "" },
  email: { type: String, unique: true, index: true },
  password: { type: String, default: "" },
  photo: { type: String, default: "" },
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  socialLinks: {
    type: Map,
    of: String,
    default: {},
  },
  rating: {
    avg: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  review: {
    type: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        message: {
          type: String,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },

  isCreatedProfile: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
