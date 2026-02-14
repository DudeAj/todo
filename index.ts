import Fastify from "fastify";
import { connectDB } from "./db/connection.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { configDotenv } from "dotenv";
import fastifyView from "@fastify/view";
import path from "path";
import ejs from "ejs";

configDotenv();
const fastify = Fastify({
  logger: {
    level: "warn",
  },
});

fastify.register(fastifyView, {
  engine: {
    ejs: ejs, // Specify EJS as the template engine
  },
  root: path.join(process.cwd(), "views"), // Set the directory where your .ejs files are located
});

fastify.get("/", (request, reply) => {
  reply.view("index.ejs", { title: "Home" });
});

fastify.get("/health", (request, reply) => {
  reply.send({ message: "Its Working" });
});

fastify.register(taskRoutes, { prefix: "/todos" });
fastify.register(authRoutes, { prefix: "/auth" });

// try {
//   await connectDB();
//   await fastify.listen({ port: 4000 });
// } catch (err) {
//   fastify.log.error(err);
//   process.exit(1);
// }

export default async function handler(req: any, res: any) {
  await fastify.ready();
  fastify.server.emit("request", req, res);
}
