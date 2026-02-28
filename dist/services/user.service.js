var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";
const SALT_ROUNDS = 10;
const UserService = {
    async login(email, password) {
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
        const _a = user.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
        return safeUser;
    },
    async register({ name, email, password, }) {
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
        const _a = user.toObject(), { password: _ } = _a, safeUser = __rest(_a, ["password"]);
        return safeUser;
    },
};
export default UserService;
//# sourceMappingURL=user.service.js.map