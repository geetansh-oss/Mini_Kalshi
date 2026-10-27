import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    txn_type: {
        type: String,
        enum: ["onRamp", "created", "bet", "payout", "refund"],
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    },
    amount: {
        type: Number, 
        required: true
    }
});

const Wallet = mongoose.model(Wallet, walletSchema);
export default Wallet;

