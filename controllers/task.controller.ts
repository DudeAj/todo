import type { FastifyRequest, FastifyReply } from "fastify";
import TodoService from "../services/todo.service.js";
import type { QueryOptions } from "mongoose";

interface GetTodosQuery {
  author?: string;
}

const TaskController = {
  async getTodos(
    request: FastifyRequest<{ Querystring: GetTodosQuery }>,
    reply: FastifyReply,
  ) {
    const todos = TodoService.getAll(request.query.author);
    reply.code(200).send(todos);
  },
  async createTodo(request: FastifyRequest, reply: FastifyReply) {
    const todo = TodoService.create(request.body);
    reply.code(201).send(todo);
  },
  async updateTodo(request: FastifyRequest, reply: FastifyReply) {
    const updatedtodo = TodoService.update(request.params.id, request.body);
    if (!updatedtodo) {
      return reply.code(404).send({ message: "Todo not found" });
    }
    reply.send(updatedtodo);
  },
  async deleteTodo(request:FastifyRequest, reply:FastifyReply) {
    const deleted = TodoService.delete(request.params.id);
    if(!deleted) {
        return reply.code(404).send({ message: 'Todo not found' })
    }
    reply.code(204).send();
  }
};

export default TaskController;