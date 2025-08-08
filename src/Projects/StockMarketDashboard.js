import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Your deployed Amplify REST API endpoint
const API_ROOT = "https://gaiyffceuh.execute-api.us-east-1.amazonaws.com/dev";

const STOCKS = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "GOOGL", name: "Google" },
  { symbol: "TSLA", name: "Tesla" },
];

// Fallback mock data: 30 points
const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  time: `Day ${i + 1}`,
  price: 100 + 10 * Math.sin(i / 3) + Math.random() * 5,
}));

// Fetch current quote using Alpha Vantage via Lambda
function fetchQuote(symbol) {
  return fetch(`${API_ROOT}/quote?symbol=${symbol}`)
    .then((res) => res.json())
    .then((data) => {
      const q = data["Global Quote"];
      if (!q) return { c: null, pc: null };
      return {
        c: parseFloat(q["05. price"]),
        pc: parseFloat(q["08. previous close"]),
      };
    })
    .catch(() => ({ c: null, pc: null }));
}

// Fetch daily price history using Alpha Vantage via Lambda
async function fetchHistory(symbol) {
  const res = await fetch(`${API_ROOT}/candle?symbol=${symbol}`);
  const data = await res.json();
  const series = data["Time Series (Daily)"];
  if (!series) return { chartData: [], subtitle: "No Data" };

  // Format for Recharts: [{time, price}]
  const chartData = Object.entries(series)
    .map(([date, prices]) => ({
      time: date,
      price: parseFloat(prices["4. close"]),
    }))
    .reverse() // so it's oldest to newest (left to right)
    .slice(-30); // last 30 days

  return {
    chartData,
    subtitle: "Daily (Last 30 Days)"
  };
}

export default function StockMarketDashboard() {
  const [quotes, setQuotes] = useState({});
  const [histories, setHistories] = useState({});
  const [historyLabels, setHistoryLabels] = useState({});
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch latest quotes every 10 seconds
  useEffect(() => {
    let interval;
    const getQuotes = async () => {
      setLoadingQuotes(true);
      const newQuotes = {};
      for (let stock of STOCKS) {
        newQuotes[stock.symbol] = await fetchQuote(stock.symbol);
      }
      setQuotes(newQuotes);
      setLoadingQuotes(false);
    };
    getQuotes();
    interval = setInterval(getQuotes, 1800000);
    return () => clearInterval(interval);
  }, []);

  // Fetch price histories every minute
  useEffect(() => {
    let interval;
    const getHistories = async () => {
      setLoadingHistory(true);
      const newHistories = {};
      const newLabels = {};
      for (let stock of STOCKS) {
        const { chartData, subtitle } = await fetchHistory(stock.symbol);
        newHistories[stock.symbol] = chartData;
        newLabels[stock.symbol] = subtitle;
      }
      setHistories(newHistories);
      setHistoryLabels(newLabels);
      setLoadingHistory(false);
    };
    getHistories();
    interval = setInterval(getHistories, 1800000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#191716]">
      <h1 className="text-4xl font-bold mb-8 text-[#FF0035]">
        Stock Market Dashboard
      </h1>
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {STOCKS.map((stock) => {
          const quote = quotes[stock.symbol];
          const price = quote?.c;
          const prevClose = quote?.pc;
          const change = price && prevClose ? price - prevClose : 0;
          const percent = prevClose
            ? ((change / prevClose) * 100).toFixed(2)
            : "0.00";
          let history = histories[stock.symbol] || [];
          let subtitle = historyLabels[stock.symbol] || "";

          // Fallback to mock data if chart is empty
          if (!loadingHistory && (!history || history.length === 0)) {
            history = mockChartData;
            subtitle = "Demo Data";
          }

          return (
            <div
              key={stock.symbol}
              className="bg-[#1e1a23]/90 rounded-xl shadow-lg p-6 border border-[#39322b]"
            >
              <div className="flex justify-between items-center pb-4">
                <div>
                  <div className="font-semibold text-[#cabfa7] text-lg">
                    {stock.name} ({stock.symbol})
                  </div>
                  <div className="text-sm text-[#cabfa7]/80">
                    {loadingQuotes ? "Loading..." : "Updated now"}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-white">
                    {price ? `$${price.toFixed(2)}` : "—"}
                  </div>
                  <div
                    className={
                      "text-sm " +
                      (change > 0
                        ? "text-green-400"
                        : change < 0
                        ? "text-red-400"
                        : "text-[#cabfa7]")
                    }
                  >
                    {change > 0 ? "+" : ""}
                    {change ? change.toFixed(2) : "0.00"} ({percent}%)
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center mb-1">
                <span className="text-xs text-[#cabfa7]/70 pl-1">
                  {subtitle}
                </span>
              </div>
              <div className="w-full h-48">
                {loadingHistory ? (
                  <div className="flex items-center justify-center h-full text-[#cabfa7]/80">
                    Loading chart...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                      <XAxis dataKey="time" minTickGap={6} />
                      <YAxis domain={["auto", "auto"]} hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#FF0035"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[#cabfa7]/60 mt-8 text-xs">
        Powered by{" "}
        <a href="https://www.alphavantage.co/" className="underline">
          Alpha Vantage
        </a>
      </div>
    </div>
  );
}
