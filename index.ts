import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import { connectDB } from "./db/connection.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { configDotenv } from "dotenv";
import fastifyView from "@fastify/view";
import path from "path";
import ejs from "ejs";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers/index.js";
import { ApolloServer } from "@apollo/server";
import fastifyApollo from "@as-integrations/fastify";
import jwt from "jsonwebtoken";
import { getMyContext, type UserPayload } from "./middleware/auth.middleware.js";

const typeDefs = await readFile("./types/index.graphql", "utf-8");

export interface MyContext {
  token: string | null;
}

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection:true
});

await server.start();

await fastify.register(fastifyApollo(server), {
  path: "/graphql",
  // context: getMyContext,
});

// try {
//   // await connectDB();
//   await fastify.listen({ port: 4000 });
// } catch (err) {
//   fastify.log.error(err);
//   process.exit(1);
// }

export default async function handler(req: any, res: any) {
  await fastify.ready();
  fastify.server.emit("request", req, res);
}
