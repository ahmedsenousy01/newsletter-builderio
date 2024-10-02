/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
    // Get the subscribers from the Builder.io API
    const res = await fetch(
      `https://cdn.builder.io/api/v3/content/newsletter-subscription-list?apiKey=${env.NEXT_PUBLIC_BUILDER_API_KEY}`,
    );
    const content = await res.json();
    const emails = content?.results?.map((item: any) => item?.data?.email);

    // Extract the necessary data from the payload
    const emailContent = newValue.data?.body;
    const emailSubject = newValue.data?.subject;

    // Set up Nodemailer transport (you need to configure your email service)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.NODEMAILER_EMAIL,
        pass: env.NODEMAILER_PASSWORD,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: `Liwan Gallery <${env.NODEMAILER_EMAIL}>`, // sender address
      to: emails.length > 0 ? emails : ["ahmedsenousy.route@gmail.com"], // list of receivers
      subject: emailSubject, // Subject line
      text: emailContent, // plain text body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond to the webhook
      return NextResponse.json({ status: "success", message: "Emails sent" });
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
