import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";
import type mongoose from "mongoose";

const SALT_ROUNDS = 10;

interface IUser {
  _id: mongoose.Types.ObjectId;
  name?: string;
  email: string;
  password?: string;
  profile?: string;
  createdAt: Date;
  updatedAt: Date;
}

type SafeUser = Omit<IUser, "password">;

const UserService = {
  async login(email: string, password: string): Promise<SafeUser> {
    // 1. Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.password);
    console.log("isValid", isValid);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // 3. Remove sensitive fields before returning
    const { password: _, ...safeUser } = user.toObject();

    return safeUser as SafeUser;
  },

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<SafeUser> {
    //1. check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User Already Exist");
    }
    //2. Hash Password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    //3. create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    //4. Remove Sensitive Fields
    const { password: _, ...safeUser } = user.toObject();
    return safeUser as SafeUser;
  },
};

export default UserService;
