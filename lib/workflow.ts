import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/config";
import nodemailer from "nodemailer";
import { getWelcomeEmail } from "./email/welcome_email";

export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
});

export const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

type InitialData = {
  email: string;
  fullName: string;
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stevanzivadinovic11@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async (
  templateParams: InitialData
): Promise<void> => {
  if (!templateParams || !templateParams.email || !templateParams.fullName) {
    throw new Error("Invalid template parameters");
  }
  const { email, fullName } = templateParams;
 const { subject, html, text } = getWelcomeEmail(fullName);
 
  try {
    transporter.sendMail({
      from: "stevanzivadinovic11@gmail.com",
      to: email,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.error("FAILED...", error);
  }
};
