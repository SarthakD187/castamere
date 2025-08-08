const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

// Environment variable for API Key
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

exports.handler = async (event) => {
  const { path, queryStringParameters } = event;

  // /api/quote?symbol=TSLA
  if (path.endsWith('/quote')) {
    const symbol = queryStringParameters.symbol;
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  }

  // /api/candle?symbol=TSLA&resolution=1&from=...&to=...
  if (path.endsWith('/candle')) {
    const { symbol, resolution, from, to } = queryStringParameters;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  }

  // Default/fallback
  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Invalid request" }),
  };
};
