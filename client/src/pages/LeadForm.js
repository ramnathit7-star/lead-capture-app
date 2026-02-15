import { useState } from "react";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    source: ""
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);   

  let webhookStatus = "pending";

  const newLead = {
    id: Date.now(),
    ...formData,
    createdAt: new Date().toISOString(),
    webhookStatus
  };

  try {
    const response = await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead)
    });

    let data = {};
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (err) {
        data = {};
      }
    }

    if (data.lead && typeof data.lead.webhookStatus === "string") {
      webhookStatus = data.lead.webhookStatus;
    } else if (data.success === true) {
      webhookStatus = "success";
    } else {
      webhookStatus = response.ok ? "success" : "failed";
    }

  } catch (error) {
    webhookStatus = "failed";
  }

  const finalLead = {
    ...newLead,
    webhookStatus
  };

  const existing = JSON.parse(localStorage.getItem("leads")) || [];
  localStorage.setItem("leads", JSON.stringify([...existing, finalLead]));

  alert("Lead Submitted Successfully");

  setFormData({ name: "", email: "", mobile: "", company: "", source: "" });

  setLoading(false);   
};


  return (
    <div className="card dashboard-card p-4">
      <h4 className="mb-4">Add New Lead</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mb-3"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control mb-3"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          className="form-control mb-3"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
        />

        <select
  className="form-control mb-3"
  name="source"
  value={formData.source}  
  onChange={handleChange}
  required
>
  <option value="">Select Source</option>
  <option value="Website">Website</option>
  <option value="Instagram">Instagram</option>
  <option value="Referral">Referral</option>
  <option value="Other">Other</option>
</select>

       <button className="btn btn-success w-100" disabled={loading}>
  {loading ? (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
      ></span>
      Submitting...
    </>
  ) : (
    "Submit Lead"
  )}
</button>

      </form>
    </div>
  );
}

export default LeadForm;
