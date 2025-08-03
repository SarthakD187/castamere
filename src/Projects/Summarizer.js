import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reusable themed back button
function BackButton({ label = "Back" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        font-mono flex items-center gap-2 px-3 py-1 rounded-xl border border-[#cabfa7]
        bg-transparent hover:bg-[#292420] text-[#cabfa7] hover:text-white
        transition text-base shadow focus:outline-none
      `}
      style={{ width: "fit-content", minWidth: "48px" }}
    >
      <span aria-hidden className="text-lg">←</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

const API_URL = "https://tvr628nywa.execute-api.us-east-1.amazonaws.com/dev/summarize";

export default function Summarizer() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 relative bg-[#191716]">
      {/* Subtle dots/noise background */}
      <div className="noise-bg"></div>

      <div className="w-full max-w-xl bg-[#221f1e]/80 border border-[#39322b] rounded-xl shadow-md p-0 z-10">
        {/* Header row: back button left, page title right */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-[#39322b] bg-[#191716]/80 rounded-t-xl select-none">
          <BackButton label="Back" />
          <span className="font-mono uppercase tracking-wider text-gray-200 text-base ml-3">
            /summarizer
          </span>
        </div>
        <div className="flex flex-col gap-5 px-8 pt-7 pb-8">
          <div className="font-mono text-xl text-[#cabfa7] tracking-wide pb-1">
            AI Article Summarizer
          </div>
          <label className="block font-mono text-[#b9ac90] pb-1 text-sm">
            Paste a news or blog article link below and get a concise AI summary.
          </label>
          <textarea
            className="font-mono w-full bg-[#191716] text-[#eee] border-none rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#cabfa7] placeholder-[#574ae2]/50 transition"
            rows={4}
            placeholder="Paste article URL here..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={async () => {
              setLoading(true);
              setSummary("");
              setError("");
              try {
                const res = await fetch(API_URL, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ url: input }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "An error occurred.");
                setSummary(data.summary);
              } catch (err) {
                setError(err.message || "Error summarizing the article.");
              }
              setLoading(false);
            }}
            className={`
              bg-[#574ae2] hover:bg-[#4d41c0] text-white font-bold py-2 px-7 rounded-xl
              shadow transition disabled:opacity-50 disabled:cursor-not-allowed
              font-mono text-base tracking-wide
            `}
            disabled={loading || !input}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
          {error && (
            <div className="font-mono text-red-300 bg-red-950/70 rounded p-3 mt-2">
              {error}
            </div>
          )}
          {summary && (
            <div className="mt-3 font-mono bg-[#181716]/90 border border-[#cabfa7]/30 rounded-xl p-4 text-[#e9e5de] shadow animate-fadein">
              <div className="text-[#cabfa7] pb-1 text-base font-bold">Summary:</div>
              <div className="whitespace-pre-line">{summary}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
