import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    try {
      // Verify SMTP connection
      await transporter.verify();
      console.log("SMTP connection verified successfully");

      // Email template
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <h3>Message:</h3>
          <p>${message}</p>
          <br/>
          <p><small>Note: You can reply directly to this email to contact ${name}</small></p>
        `,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
      
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Email error details:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
