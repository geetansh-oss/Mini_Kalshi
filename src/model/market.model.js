import mongoose from "mongoose";

const marketSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    initial_wager: {
        type: Number, 
        required: true
    },
    side: {
        type: String, 
        enum:["yes", "no"], 
        required: true
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    resolution: {
        type: String, 
        enum:["yes", "no", null], 
        default: null
    },
    expiry: {
        type: Date, 
        required: true
    }
});

const Market = mongoose.model(Market, marketSchema);
export default Market;