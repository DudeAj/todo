import type { FastifyRequest, FastifyReply } from "fastify";
import type { MyContext } from "../index.js";
export interface UserPayload {
    id: string;
    email: string;
}
declare module "fastify" {
    interface FastifyRequest {
        user: UserPayload;
    }
}
export declare const authMiddleware: (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const getMyContext: (request: FastifyRequest, reply: FastifyReply) => Promise<MyContext>;
//# sourceMappingURL=auth.middleware.d.ts.map