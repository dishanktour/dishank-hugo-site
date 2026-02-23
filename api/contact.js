export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    try {
      const { name, phone, time, place, message } = req.body;
  
      console.log("New Inquiry:");
      console.log("Name:", name);
      console.log("Phone:", phone);
      console.log("Preferred Time:", time);
      console.log("Place:", place);
      console.log("Message:", message);
  
      return res.status(200).json({ success: true });
  
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  }