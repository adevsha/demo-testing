const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const EXTERNAL_SERVICE_URL =
  process.env.EXTERNAL_SERVICE_URL || "https://api.external-service.com";

app.get("/health", async (_req, res) => {
  try {
    const upstream = await axios.get(`${EXTERNAL_SERVICE_URL}/status`);
    res.status(200).json({
      status: "healthy",
      uptime: process.uptime(),
      external: upstream.data,
    });
  } catch {
    res.status(200).json({
      status: "healthy",
      uptime: process.uptime(),
      external: "unavailable",
    });
  }
});

module.exports = app;
