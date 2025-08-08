import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ───────── Reusable Back Button ───────── */
function BackButton({ label = "Back" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="
        font-mono flex items-center gap-2 px-3 py-1 rounded-xl border border-[#cabfa7]
        bg-transparent hover:bg-[#292420] text-[#cabfa7] hover:text-white
        transition text-base shadow focus:outline-none
      "
      style={{ width: "fit-content", minWidth: "48px" }}
    >
      <span aria-hidden className="text-lg">←</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

const API_URL =
  "https://tvr628nywa.execute-api.us-east-1.amazonaws.com/dev/summarize";

export default function Summarizer({ previewMode = false }) {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Layout tweaks when embedded */
  const outerClass = previewMode
    ? "h-full flex flex-col items-center bg-white"
    : "min-h-screen flex flex-col items-center pt-24 bg-[#191716] relative";

  return (
    <div className={outerClass}>
      {/* Noise background only in full page */}
      {!previewMode && <div className="noise-bg" />}

      <div
        className={`w-full max-w-xl rounded-xl shadow-md p-0 z-10 h-full ${
          previewMode
            ? "bg-white border border-gray-200"
            : "bg-[#221f1e]/80 border border-[#39322b]"
        }`}
      >
        {/* Header (hidden in preview) */}
        <div
          className={`
            flex items-center justify-between px-8 pt-8 pb-4 border-b
            ${previewMode ? "hidden" : "border-[#39322b] bg-[#191716]/80 rounded-t-xl"}
          `}
        >
          <BackButton label="Back" />
          <span className="font-mono uppercase tracking-wider text-gray-200 text-base ml-3">
            /summarizer
          </span>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col gap-5 px-8 py-8 ${
            previewMode ? "h-full overflow-y-auto" : "pt-7"
          }`}
        >
          <div
            className={`font-mono text-xl tracking-wide pb-1 ${
              previewMode ? "text-black" : "text-[#cabfa7]"
            }`}
          >
            AI Article Summarizer
          </div>

          <label
            className={`block font-mono pb-1 text-sm ${
              previewMode ? "text-gray-700" : "text-[#b9ac90]"
            }`}
          >
            Paste a news or blog article link below and get a concise AI summary.
          </label>

          <textarea
            className={`font-mono w-full rounded-lg p-4 resize-none focus:outline-none transition
              ${
                previewMode
                  ? "bg-gray-100 text-black focus:ring-2 focus:ring-[#FF5800] placeholder-gray-400"
                  : "bg-[#191716] text-[#eee] focus:ring-2 focus:ring-[#cabfa7] placeholder-[#574ae2]/50"
              }`}
            rows={4}
            placeholder="Paste article URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
              font-mono text-base tracking-wide font-bold py-2 px-7 rounded-xl shadow transition
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                previewMode
                  ? "bg-[#3461eb] hover:bg-[#2949b4] text-white"
                  : "bg-[#574ae2] hover:bg-[#4d41c0] text-white"
              }
            `}
            disabled={loading || !input}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {error && (
            <div
              className={`font-mono rounded p-3 ${
                previewMode
                  ? "text-red-600 bg-red-100"
                  : "text-red-300 bg-red-950/70"
              }`}
            >
              {error}
            </div>
          )}

          {summary && (
            <div
              className={`font-mono rounded-xl p-4 shadow animate-fadein whitespace-pre-line ${
                previewMode
                  ? "bg-gray-50 border border-gray-200 text-gray-900"
                  : "bg-[#181716]/90 border border-[#cabfa7]/30 text-[#e9e5de]"
              }`}
            >
              <span
                className={`font-bold ${
                  previewMode ? "text-[#FF5800]" : "text-[#cabfa7]"
                }`}
              >
                Summary:
              </span>
              <br />
              {summary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
