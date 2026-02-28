import type { FastifyRequest, FastifyReply } from "fastify";
interface GetTodosQuery {
    author?: string;
}
interface CreateTodoBody {
    content: string;
    author: string;
    completed?: boolean;
}
interface UpdateTodoBody {
    content?: string;
    completed?: boolean;
}
interface TodoParams {
    id: string;
}
declare const TaskController: {
    getTodos(request: FastifyRequest<{
        Querystring: GetTodosQuery;
    }>, reply: FastifyReply): Promise<never>;
    createTodo(request: FastifyRequest<{
        Body: Omit<CreateTodoBody, "author">;
    }>, reply: FastifyReply): Promise<never>;
    updateTodo(request: FastifyRequest<{
        Params: TodoParams;
        Body: UpdateTodoBody;
    }>, reply: FastifyReply): Promise<never>;
    markAsCompleted(request: FastifyRequest<{
        Params: TodoParams;
    }>, reply: FastifyReply): Promise<never>;
    deleteTodo(request: FastifyRequest<{
        Params: TodoParams;
    }>, reply: FastifyReply): Promise<never>;
};
export default TaskController;
//# sourceMappingURL=task.controller.d.ts.map