import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";

const SALT_ROUNDS = 10;

const UserService = {
  async login(email:string, password:string) {
    // 1. Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // 3. Remove sensitive fields before returning
    const { password: _, ...safeUser } = user.toObject();

    return safeUser;
  },
  async register({name, email,password}:{name:string, email:string, password:string}) {
    //1. check for existing user 
    const existingUser = await UserModel.find({email});
    if(existingUser) {
        throw new Error("User Already Exist");
    }
    //2. Hash Password
    const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

    //3. create user 
    const user = await UserModel.create({
        name,
        email,
        password:hashedPassword
    });

    //4. Remove Sensitive Fields
    const {password: _, ...safeUser} = user.toObject();
    return safeUser;

  }
};

export default UserService;
