import type { FastifyInstance } from "fastify";
import UserController from "../controllers/auth.controller.js";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", UserController.login);
  fastify.post("/register", UserController.register);
}

export default authRoutes;
