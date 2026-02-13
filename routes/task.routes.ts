import type { FastifyInstance } from "fastify";
import TaskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

async function taskRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", authMiddleware);

  fastify.get("/", TaskController.getTodos);
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["content"],
          properties: {
            content: {
              type: "string",
            },
          },
        },
      },
    },
    TaskController.createTodo,
  );
  fastify.put("/:id", TaskController.updateTodo);
  fastify.patch("/:id/complete", TaskController.markAsCompleted);
  fastify.delete("/:id", TaskController.deleteTodo);
}

export default taskRoutes;
