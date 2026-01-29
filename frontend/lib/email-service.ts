import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
})
export async function sendEmail(email: string, message: string, token: string) {
    const link = `http://localhost:3000/api/auth/callback?token=${token}`;

    const info = await transporter.sendMail({
        from: `Differ trading app ${process.env.SMTP_EMAIL}`,
        to: email,
        subject: message,
        html: `
         <p>Click below to log in:</p>
         <a href=${link}>Login</a>
        `

    });

    console.log("Message sent: %s", info.messageId);
    
}