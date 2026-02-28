import UserController from "../controllers/auth.controller.js";
async function authRoutes(fastify) {
    fastify.post("/login", UserController.login);
    fastify.post("/register", UserController.register);
}
export default authRoutes;
//# sourceMappingURL=auth.routes.js.map