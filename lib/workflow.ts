import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/config";
import emailjs from '@emailjs/browser';


export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken
  
});

export const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

type InitialData = {
  email: string;
  fullName: string;
};

emailjs.init({
  publicKey: 'user_iDF7GBVBepZlv2bZg187d',
  // Do not allow headless browsers
  blockHeadless: true,
    limitRate: {
    // Set the limit rate for the application
    id: 'rate-limit-1',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});

export const sendWelcomeEmail = async (templateParams: InitialData): Promise<void> => {
  if (!templateParams || !templateParams.email || !templateParams.fullName) {
    throw new Error("Invalid template parameters");
  }
  console.log("Sending welcome email to:", templateParams.email);
  const { email, fullName } = templateParams;
  const emailParams = {
    to_email: email,
    fullName: fullName,
  };

  try {
    const response = await emailjs.send('service_7zyc2rn', 'template_xbsso5c', emailParams);
    console.log('SUCCESS!', response.status, response.text);
  } catch (error) {
    console.error('FAILED...', error);
  }
};
