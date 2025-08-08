import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

// Route for stock quote
app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });
  try {
    const r = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch from Finnhub" });
  }
});

// Route for stock candles (history)
app.get("/api/candle", async (req, res) => {
  const { symbol, resolution, from, to } = req.query;
  if (!symbol || !resolution || !from || !to) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const r = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch from Finnhub" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
