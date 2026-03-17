const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// 🔹 API Route
app.post("/api/contact", async (req, res) => {
  const { name, phone, time, place, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dishanktour@gmail.com",
        pass: "bzhdxzeyncdnidvj"
      }
    });

    await transporter.sendMail({
      from: `"Dishank Travel" <dishanktour@gmail.com>`,
      to: "dishanktour@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Preferred Time:</b> ${time}</p>
        <p><b>Place:</b> ${place}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
});

// 🔹 Build Hugo automatically before starting
exec("hugo", (err) => {
  if (err) {
    console.log("Hugo build failed");
  } else {
    console.log("Hugo build complete");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});