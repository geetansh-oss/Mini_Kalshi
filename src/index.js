import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());


app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000");
});