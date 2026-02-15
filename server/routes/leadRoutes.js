const express = require("express");
const router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


let leads = [];

router.post("/", async (req, res) => {
  const leadData = { ...req.body };
  const leadDetails = {"name": leadData.name, "email": leadData.email, "source": leadData.source, "createdAt": leadData.createdAt};
  const lead = { ...leadDetails, webhookStatus: "pending" };
  leads.push(lead);

  console.log("Incoming Lead:", lead);

  try {
    const response = await fetch(process.env.WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadDetails)
    });

    lead.webhookStatus = response.ok ? "success" : "failed";
  } catch (err) {
    console.error("Webhook error:", err.message);
    lead.webhookStatus = "failed";
  }

  console.log("Webhook Status:", lead.webhookStatus);

  res.json({ message: "Lead received", lead });
});


router.get("/", (req, res) => {
  res.json(leads);
});

module.exports = router;
