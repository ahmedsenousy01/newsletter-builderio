/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  // Parse the incoming request body
  const body = (await request.json()) as {
    newValue: Record<string, any>;
    operation: string;
    modelName: string;
  };

  // Ensure it's from the correct model and it's a publish operation
  const { newValue, operation, modelName } = body;

  if (operation === "publish" && modelName === "newsletter-emails") {
    // Extract the necessary data from the payload
    const emailContent = newValue.data.body; // Customize this based on your payload structure
    const emailSubject = newValue?.subject ?? "New Newsletter"; // You can use the name of the newsletter or another field

    // Set up Nodemailer transport (you need to configure your email service)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use another email provider
      auth: {
        user: env.NODEMAILER_EMAIL ?? "liwangaller.dev@gmail.com", // your email
        pass: env.NODEMAILER_PASSWORD ?? "Put real password here", // your email password or app-specific password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: env.NODEMAILER_EMAIL, // sender address
      to: "ahmedsenousy.route@gmail.com", // list of receivers
      subject: emailSubject, // Subject line
      text: emailContent, // plain text body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");

      // Respond to the webhook
      return NextResponse.json({ status: "success", message: "Email sent" });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({
        status: "error",
        message: "Email not sent",
        error,
      });
    }
  } else {
    // If the operation isn't a publish or it's not for the correct model, just return
    return NextResponse.json({
      status: "ignored",
      message: "Not a publish operation for newsletter-emails",
    });
  }
}
