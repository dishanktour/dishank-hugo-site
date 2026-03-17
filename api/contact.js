import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, phone, time, place, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Dishank Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Travel Inquiry from ${name}`,
      html: `
        <h2>New Travel Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Place:</strong> ${place}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}