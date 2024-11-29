import nodemailer from 'nodemailer';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email configuration is missing. Please check your environment variables.');
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true, // Enable debug logs
  logger: true, // Enable logger
  tls: {
    rejectUnauthorized: false
  }
});
