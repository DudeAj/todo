import type mongoose from "mongoose";
import TaskModel from "../models/Task.js";
import "../models/User.js";

interface ITodo {
  content: string;
  author: string | mongoose.Types.ObjectId;
  completed?: boolean;
}

const TodoService = {
  async getAll(author: string) {
    return TaskModel.find({ author })
      .populate("author", "name email")
      .lean()
      .exec();
  },
  async create(todo: ITodo) {
    const newTodo = await TaskModel.create(todo);
    return newTodo.toObject();
  },
  async update(id: string, todo: Partial<ITodo>) {
    return TaskModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
  },
  async delete(id: string) {
    return TaskModel.findByIdAndDelete(id).lean().exec();
  },
};

export default TodoService;
