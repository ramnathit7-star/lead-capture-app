require("dotenv").config();
const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadRoutes);

app.listen(process.env.PORT, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
