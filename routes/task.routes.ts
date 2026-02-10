import type { FastifyInstance } from "fastify";
import TaskController from "../controllers/task.controller.js";

function taskRoutes(fastify:FastifyInstance) {
    fastify.get('/',TaskController.getTodos);
    fastify.post('/',{
        schema:{
            body:{
                type:'object',
                required:['content','author'],
                properties:{
                    content:{
                        type:'string',
                    },
                    author: {
                        type:'string',
                    }
                }
            }
        }
    },TaskController.createTodo);
    fastify.put('/:id',TaskController.updateTodo);
    fastify.delete('/:id',TaskController.deleteTodo);

}

export default taskRoutes;