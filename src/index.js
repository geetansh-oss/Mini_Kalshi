import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes.js";
import marketRouter from "./routes/market.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/market", marketRouter);


 const db_connection = async()=>{
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running on port 3000");
    });
}

db_connection.catch(console.error);