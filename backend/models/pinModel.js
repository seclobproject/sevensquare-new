import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    district: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
