import FoodOrderEmail from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from 'nodemailer';

// const resend = new Resend(process.env.RESEND_API_KEY);
const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
    },
  });
export async function POST(req) {
    const response = await req.json();
    try {
        // const data = await resend.emails.send({
        //     from: "Foodie-Cart",
        //     to: [response.email],
        //     subject: 'Foodie Cart Order Confirmation',
        //     react: FoodOrderEmail(),
        //   });
        console.log("Sending Email with params: ", {response})
        const emailHtml = (
            <FoodOrderEmail /> // Server component rendered here
          );

        const options = {
            from: 'yaredbitewlign@gmail.com',
            to: response.email,
            subject: 'Foodie Cart Order Confirmation', 
            html: emailHtml,
        };

        const data = await transporter.sendMail(options);

        return NextResponse.json({data})
    } catch(error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({error})
    }
}