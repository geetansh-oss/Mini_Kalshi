import {z} from Zod;

export const marketSchema = z.object({
    title: z.string().min(),
    initial_amt: z.Number().int().positive(),
    side: z.literal(["yes", "no"]),
    expiry: z.iso.date(),
});

export const betsSchema = z.object({
    market_id: z.string(),
    bet_amount: z.Number().int().positive()
});

