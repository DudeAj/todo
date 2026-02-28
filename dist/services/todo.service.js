import TaskModel from "../models/Task.js";
import "../models/User.js";
const TodoService = {
    async getAll(author) {
        return TaskModel.find({ author })
            .populate("author", "name email")
            .lean()
            .exec();
    },
    async create(todo) {
        const newTodo = await TaskModel.create(todo);
        return newTodo.toObject();
    },
    async update(id, todo) {
        return TaskModel.findByIdAndUpdate(id, todo, {
            new: true,
            runValidators: true,
        })
            .lean()
            .exec();
    },
    async delete(id) {
        return TaskModel.findByIdAndDelete(id).lean().exec();
    },
};
export default TodoService;
//# sourceMappingURL=todo.service.js.map