import db from "./db";
import { sendEmail } from "./email-service";
import redis from "./redis";
import jwt from "jsonwebtoken"
const MAGIC_SECRET = process.env.MAGIC_SECRET || "3+6ZVw46t/+EkUfiqlrcOKnCHKE=";

export async function sendMagicLink(email: string) {
    const token = jwt.sign({email}, MAGIC_SECRET, {expiresIn: "10m"});
    

    await redis.set(`magic:${token}`, email, { ex: 600 });


    await sendEmail(email, "Your login link", token); 


}


export async function verifyMagicLink(token: string) {
    try {
        const payload:any = jwt.verify(token, MAGIC_SECRET);


        const email = await redis.get(`magic:${token}`);
        if(!email) return null;

        let user = await db.user.findUnique({
            where: {
                email: payload.email
            }

        });
        if(!user){
            user = await db.user.create({
                data: {
                    email: payload.email,
                    
                }
            })
        }

        const session = jwt.sign({id: user.id, email: user.email}, MAGIC_SECRET, {expiresIn: "7d"});

        return {token: session, user}
    } catch (error) {
        return null
    }
}