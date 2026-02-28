import TodoService from "../services/todo.service.js";
const TaskController = {
    async getTodos(request, reply) {
        var _a;
        try {
            const author = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!author) {
                return reply.code(401).send({ message: "Unauthorized" });
            }
            const todos = await TodoService.getAll(author);
            return reply.code(200).send(todos);
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error", error });
        }
    },
    async createTodo(request, reply) {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return reply.code(401).send({ message: "Unauthorized" });
            }
            const todo = await TodoService.create(Object.assign(Object.assign({}, request.body), { author: userId }));
            return reply.code(201).send(todo);
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error", error });
        }
    },
    async updateTodo(request, reply) {
        try {
            const updatedtodo = await TodoService.update(request.params.id, request.body);
            if (!updatedtodo) {
                return reply.code(404).send({ message: "Todo not found" });
            }
            return reply.send(updatedtodo);
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error", error });
        }
    },
    async markAsCompleted(request, reply) {
        try {
            const updatedtodo = await TodoService.update(request.params.id, {
                completed: true,
            });
            if (!updatedtodo) {
                return reply.code(404).send({ message: "Todo not found" });
            }
            return reply.send(updatedtodo);
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error", error });
        }
    },
    async deleteTodo(request, reply) {
        try {
            const deleted = await TodoService.delete(request.params.id);
            if (!deleted) {
                return reply.code(404).send({ message: "Todo not found" });
            }
            return reply.code(204).send();
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error", error });
        }
    },
};
export default TaskController;
//# sourceMappingURL=task.controller.js.map