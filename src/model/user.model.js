import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, required: true}
});

const User = mongoose.model("User", userSchema);

export default User;