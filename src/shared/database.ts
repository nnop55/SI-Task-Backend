import { dbParams } from "./config";
import mongoose from "mongoose";

const uri = `mongodb+srv://${dbParams.user}:${dbParams.password}@si-db.4o106tz.mongodb.net/?retryWrites=true&w=majority&appName=SI-DB`

mongoose.connect(uri);

export const connectDb = () => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => console.log("Connected to MongoDB"));
}