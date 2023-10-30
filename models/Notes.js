import mongoose from "mongoose";

const schema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Please enter your title"],
   },

   description: {
      type: String,
      required: [true, "Please enter your description"],
   },

   isCompleted: {
      type: Boolean,
      default: false
   },

   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   createdAt: {
      type: Date,
      default: Date.now,
   },
});

export const Notes = mongoose.model("Notes", schema);