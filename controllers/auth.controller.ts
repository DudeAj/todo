import type { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
const JWT_EXPIRES_IN = "7d";
const UserController = {
  async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return reply.code(400).send({
          message: "email or password is required",
        });
      }
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return reply.code(500).send({ message: "Internal Server Error" });
      }

      const user = await UserService.login(email, password);
      const token = jwt.sign(
        { id: user._id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );
      return reply.code(200).send({
        message: "Successful",
        token,
        data: user,
      });
    } catch (err: any) {
      console.error("Login error:", err);
      return reply.code(401).send({
        message: err.message || "Invalid email or password",
      });
    }
  },
  async register(
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply,
  ) {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        return reply.code(400).send({
          message: "Name, email, and password are required",
        });
      }

      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return reply.code(500).send({ message: "Internal Server Error" });
      }

      const user = await UserService.register({ name, email, password });

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );

      return reply.code(201).send({
        message: "User registered successfully",
        token,
        data: user,
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      const statusCode = err.message === "User Already Exist" ? 409 : 500;
      return reply.code(statusCode).send({
        message: err.message || "Registration failed",
      });
    }
  },
};

export default UserController;
