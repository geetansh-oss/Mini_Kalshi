import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../model/user.model.js";
import Wallet from "../model/wallet.model.js";
import { signupSchema, signinSchema, onrampSchema } from "../types/auth.types.js";


export const signup = async(req, res) => {
    try {
        const {name, password} = signupSchema.parse(req.body);
        
        const existingUser = await User.findOne({name});
        if(existingUser){
            return res.status(409).json({
                error: "Username already exist"
            });
        };
        
        const hashed_password = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            hashed_password,
            balance: 0,
        });
        
        return res.status(200).json({
            id: user._id
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    };      
}

export const signin = async(req, res) => {
    try {
        const {name, password} = signinSchema.parse(req.body);

        const user = await User.findOne({name});
        if(!user){
            return res.status(401).json({
                error:"Invalid Credentials"
            });
        }
        const is_match = await bcrypt.compare(password, user.password);
        if(!is_match){
            return res.status(401).json({
                error:"Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {userId: user._id.toString()},
            process.env.JWT_SECRET
        );

        return res.json({token});
        
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

export const onramp = async(req, res) => {
    try {
        const {amount} = onrampSchema.parse(req.body);
        const userId = req.userId;

        const user = User.findByIdAndUpdate(
            userId,
            {$inc: {balance : amount}},
            {new : true}
        );
        if(!user){
            return res.status(404).json({
                error: "user not found"
            })
        }

        await Wallet.create({
            user_id: user._id,
            txn_type: "onRamp",
            amount: amount,
            metadata: {
                razor_pay_id: "908htg09e5ng57tw4y05yt"
            }
        });

        return res.status(200).json({
            balance: user.balance,
        });
          
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

export const profile = async(req, res) => {
    try {
        const userId = req.userId;
        const user = User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            });
        }
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(404).json({
                error: error.message
            });
    }
}

export const transactions = async(req, res) => {
    try {
        const userId = req.userId;
        
        const user_txn = await Wallet.findById(userId);
        if(!user_txn){
            return res.status(400).json({
                error: "no wallet history available"
            });
        }
        return res.status(200).json(user_txn);
    } catch (error) {
        return res.status(400).json({
                error: error.message
            });
    }
}