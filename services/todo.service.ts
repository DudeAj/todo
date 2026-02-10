import type mongoose from "mongoose";
import TaskModel from "../models/Task.js";

type ITodo = {content:string, author:any}

const TodoService = {
    getAll(author:mongoose.Schema.Types.ObjectId) {
        return TaskModel.find({author}).populate('author','name email').lean();
    },
    create(todo:ITodo) {
        return TaskModel.create(todo);
    },
    update(id:mongoose.Schema.Types.ObjectId, todo:ITodo) {
        return TaskModel.findOneAndUpdate(id,todo,{
            new:true,
            runValidators:true,
        })
    },
    delete(id:mongoose.Schema.Types.ObjectId) {
        return TaskModel.findByIdAndDelete(id);
    }

}

export default TodoService;