import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().min(3),
    password: z.string().min(5)
});

export const signinSchema = z.object({
    name: z.string(),
    password: z.string()
});

export const onrampSchema = z.object({
    amount: z.number().int().positive(),
});