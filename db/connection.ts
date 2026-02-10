import mongoose from "mongoose";

export const  connectDB =async () => {
    if(!process?.env?.MONGO_URI) {
        console.log('Please provide connecting string');
        return;
    }
    mongoose.connect(process.env.MONGO_URI).then(data=> {
        console.log('DB connected successfully')
    }).catch(err=> {
        console.log('unable to connect to server',err);
    })
}