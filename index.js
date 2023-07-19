import express from "express";
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = process.env.PORT || 3000;

const app = express();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch(error) {
        throw error
    }
}

mongoose.connection.on("disconnected" , () => {
    console.log("mongo db disconnected");
})

//middlewear
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/hotels" , hotelRoute);
app.use("/api/rooms" , roomRoute);

app.use((err,req,res,next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";
    return res.status(errStatus).json({
        Success : false,
        status : errStatus,
        message : errMessage,
        stack : err.stack,
    });
})

app.listen(PORT , () => {
    connect();
    console.log("Connected to server");
})