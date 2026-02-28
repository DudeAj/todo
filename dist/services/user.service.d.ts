import type mongoose from "mongoose";
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
declare const UserService: {
    login(email: string, password: string): Promise<SafeUser>;
    register({ name, email, password, }: {
        name: string;
        email: string;
        password: string;
    }): Promise<SafeUser>;
};
export default UserService;
//# sourceMappingURL=user.service.d.ts.map