import mongoose from "mongoose";
let isConnected = false;
export const connectDB = async () => {
    var _a, _b;
    if (isConnected) {
        return;
    }
    if (!((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI)) {
        console.log("Please provide connecting string");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = ((_b = db.connections[0]) === null || _b === void 0 ? void 0 : _b.readyState) === 1;
        console.log("DB connected successfully");
    }
    catch (err) {
        console.log("unable to connect to server", err);
    }
};
//# sourceMappingURL=connection.js.map