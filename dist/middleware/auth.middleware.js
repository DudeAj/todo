import jwt from "jsonwebtoken";
export const authMiddleware = async (request, reply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.code(401).send({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return reply.code(401).send({ message: "Token missing" });
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return reply.code(500).send({ message: "Internal Server Error" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
    }
    catch (error) {
        return reply.code(401).send({ message: "Invalid or expired token" });
    }
};
export const getMyContext = async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return reply.code(401).send({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return reply.code(401).send({ message: "Token missing" });
    }
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return reply.code(500).send({ message: "Internal Server Error" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    return {
        token
    };
};
//# sourceMappingURL=auth.middleware.js.map