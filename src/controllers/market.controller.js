import Bets from "../model/bets.model";
import Market from "../model/market.model";
import User from "../model/user.model";
import Wallet from "../model/wallet.model";
import { marketSchema, betsSchema } from "../types/market.types";


export const Create_Market = async(req, res) => {
    try {
        const userId = req.userId;
        const {title, initial_amt, side, expiry} = marketSchema.parse(req.body);

        const new_market = await Market.create({
            title: title,
            initial_wager: initial_amt,
            side: side,
            creator_id: userId,
            expiry: expiry
        });

        return res.status(200).json(new_market);

    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

export const get_Market = async(req, res) => {
    try {
        const markets = await Market.find().populate("creator_id", "name");

        return res.status(200).json(markets);
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

export const create_bet = async(req, res) => {
    try {
        const userId = req.userId;
        const{market_id, bet_amount} = betsSchema.parse(req.body);
        const user = await User.findbyId(userId);
        const market = await Market.findById(market_id);
        const existing_bets = await Bets.find({market_id : market_id});
        const existing_bets_amount = existing_bets.reduce(
            (sum, bet) => sum + bet.bet_amount, 0
        );

        if (!user || user.balance < bet_amount){
            return res.status(404).json({
                error:"low balance"
            })
        }
        if (!market) {
            return res.status(404).json({
                error: "Market not found",
            });
        }
        if(market.resolution !== null){
            return res.status(404).json({
                error: "Market is already resolved",
            });
        }
        if(market.expiry < new Date()){
            return res.status(404).json({
                error: "Market is Expired",
            });
        }
        if (market.creator_id.toString() === req.userId) {
           return res.status(400).json({
                error: "Creator cannot bet against their own market",
            });
        }
        if (existing_bets_amount + bet_amount > market.initial_wager) {
            return res.status(400).json({
                error: "bet amount is out of bound",
            });
        }
        user.balance -= bet_amount;
        await user.save();

        const bet = await Bets.create({
            user_id: userId,
            market_id: market_id,
            bet_amount: bet_amount
        })

        await Wallet.create({
            user_id: userId,
            txn_type: "bet",
            amount: -bet_amount,
            metadata:{
                bet_id : bet._id,
                market_id: market_id
            }
        })
        
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}

export const get_bets = async(req, res) => {
    try {
        const userId = req.userId;
        const bets = await Bets.find({user_id: userId}).poupulate("marketId");

        return res.status(200).json(bets);
        
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}
