import { dbParams } from "./config";
import mongoose from "mongoose";

const uri = `mongodb+srv://${dbParams.user}:${dbParams.password}@si-db.4o106tz.mongodb.net/?retryWrites=true&w=majority&appName=SI-DB`

export const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDb connection Error:", error);
    }
}

export const closeConnection = async () => {
    await mongoose.connection.close();
}