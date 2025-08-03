const { OpenAI } = require('openai');
const axios = require('axios');
const unfluff = require('unfluff');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const url = body.url;
    if (!url) throw new Error("No URL provided");

    // Fetch HTML and extract content
    const { data: html } = await axios.get(url, { timeout: 10000 });
    const parsed = unfluff(html);
    const plainText = parsed.text?.replace(/\s+/g, " ").trim();

    if (!plainText || plainText.length < 200) {
      throw new Error("Could not extract article content.");
    }

    // Summarize with OpenAI
    const prompt = `Summarize the following article in 5-7 sentences:\n\n${plainText}`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const summary = response.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ summary }),
    };

  } catch (err) {
    console.error("Error in handler:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message || "Internal error" }),
    };
  }
};
