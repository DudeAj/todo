import type { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN= '7d';
const UserController = {
  //   async loginUser(request, reply) {
  //     try {
  //       const { email, password } = request.body;

  //       if (!email || !password) {
  //         return reply.code(400).send({
  //           message: "Email and password are required",
  //         });
  //       }

  //       const user = await UserService.login(email, password);

  //       return reply.code(200).send({
  //         message: "Login successful",
  //         data: user,
  //       });
  //     } catch (error) {
  //       return reply.code(401).send({
  //         message: error?.message || "Invalid email or password",
  //       });
  //     }
  //   },
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return reply.code(400).send({
          message: "email or password is required",
        });
      }
      const user = UserService.login(email, password);
      return reply.code(200).send({
        message: "Successful",
        data: user,
      });
    } catch (err: any) {
      return reply.code(401).send({
        message: err.message || "Invalid email or password",
      });
    }
  },
  async register(request:FastifyRequest, reply:FastifyReply) {
    try {
        const {name,email,password} = request.body;
        if(!name || !email || !password) {
            return reply.code(400).send({
                message: "Name, email, and password are required",
            });
        }
        
        const user = await UserService.register({name,email,password});
        
        const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        
        return reply.code(201).send({
            message: "User registered successfully",
            token,
            data: user,
        }
    
    } catch(err) {
        return reply.code(409).send({
        message: err?.message || "Registration failed",
      });
    }
}
};

export default UserController;
