import type { FastifyRequest, FastifyReply } from "fastify";
import TodoService from "../services/todo.service.js";

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

const TaskController = {
  async getTodos(
    request: FastifyRequest<{ Querystring: GetTodosQuery }>,
    reply: FastifyReply,
  ) {
    try {
      const author = request.user?.id;
      if (!author) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const todos = await TodoService.getAll(author);
      return reply.code(200).send(todos);
    } catch (error) {
      return reply.code(500).send({ message: "Internal Server Error", error });
    }
  },
  async createTodo(
    request: FastifyRequest<{ Body: Omit<CreateTodoBody, "author"> }>,
    reply: FastifyReply,
  ) {
    try {
      const userId = request.user?.id;
      if (!userId) {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      const todo = await TodoService.create({
        ...request.body,
        author: userId,
      });
      return reply.code(201).send(todo);
    } catch (error) {
      return reply.code(500).send({ message: "Internal Server Error", error });
    }
  },
  async updateTodo(
    request: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoBody }>,
    reply: FastifyReply,
  ) {
    try {
      const updatedtodo = await TodoService.update(
        request.params.id,
        request.body,
      );
      if (!updatedtodo) {
        return reply.code(404).send({ message: "Todo not found" });
      }
      return reply.send(updatedtodo);
    } catch (error) {
      return reply.code(500).send({ message: "Internal Server Error", error });
    }
  },
  async markAsCompleted(
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply,
  ) {
    try {
      const updatedtodo = await TodoService.update(request.params.id, {
        completed: true,
      });
      if (!updatedtodo) {
        return reply.code(404).send({ message: "Todo not found" });
      }
      return reply.send(updatedtodo);
    } catch (error) {
      return reply.code(500).send({ message: "Internal Server Error", error });
    }
  },
  async deleteTodo(
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply,
  ) {
    try {
      const deleted = await TodoService.delete(request.params.id);
      if (!deleted) {
        return reply.code(404).send({ message: "Todo not found" });
      }
      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ message: "Internal Server Error", error });
    }
  },
};

export default TaskController;
