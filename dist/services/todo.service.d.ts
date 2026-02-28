import type mongoose from "mongoose";
import "../models/User.js";
interface ITodo {
    content: string;
    author: string | mongoose.Types.ObjectId;
    completed?: boolean;
}
declare const TodoService: {
    getAll(author: string): Promise<({
        content: string;
        completed: boolean;
        author: mongoose.Types.ObjectId;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    create(todo: ITodo): Promise<{
        content: string;
        completed: boolean;
        author: mongoose.Types.ObjectId;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, todo: Partial<ITodo>): Promise<({
        content: string;
        completed: boolean;
        author: mongoose.Types.ObjectId;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | null>;
    delete(id: string): Promise<({
        content: string;
        completed: boolean;
        author: mongoose.Types.ObjectId;
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>) | null>;
};
export default TodoService;
//# sourceMappingURL=todo.service.d.ts.map