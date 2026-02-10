import Fastify from "fastify";
import { connectDB } from "./db/connection.js";
import taskRoutes from "./routes/task.routes.js";
import { configDotenv } from "dotenv";

configDotenv();
const fastify = Fastify({

  logger: true,
});

fastify.get('/health',(request,reply)=> {
    reply.send({message: "Its Working"})
})

fastify.register(taskRoutes, { prefix: "/todos" });

try {
  await connectDB();
  await fastify.listen({ port: 4000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
