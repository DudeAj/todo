import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default:false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
