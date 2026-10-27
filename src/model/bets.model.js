import mongoose from "mongoose";

const betsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    market_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Market",
        required: true
    },
    bet_amount: {
        type: Number,
        required: true
    }
});

const Bets = mongoose.model(Bets, betsSchema);
export default Bets;