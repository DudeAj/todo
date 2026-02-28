import type { FastifyRequest, FastifyReply } from "fastify";
interface LoginBody {
    email: string;
    password: string;
}
interface RegisterBody {
    name: string;
    email: string;
    password: string;
}
declare const UserController: {
    login(request: FastifyRequest<{
        Body: LoginBody;
    }>, reply: FastifyReply): Promise<never>;
    register(request: FastifyRequest<{
        Body: RegisterBody;
    }>, reply: FastifyReply): Promise<never>;
};
export default UserController;
//# sourceMappingURL=auth.controller.d.ts.map