import React from "react";

const buttons = [
  { label: "Personal Info" },
  { label: "Projects" },
  { label: "Art" },
  { label: "Writing" },
  { label: "Photograph" },
  { label: "" }
];

export default function CastamereHomepage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Animated background and noise */}
      <div className="animated-gradient-bg"></div>
      <div className="noise-bg"></div>

      {/* Header */}
      <header className="mb-8 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-2 drop-shadow-lg">
          Welcome to Castamere
        </h1>
        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-xl mx-auto drop-shadow">
          This is my portfolio, you will find everything in the boxes below!
        </p>
      </header>

      {/* Card/Box with soft blending */}
      <div
        className="rounded-2xl shadow-2xl p-10 flex flex-col items-center backdrop-blur-lg relative z-10"
        style={{
          background: "rgba(30, 26, 28, 0.48)", // semi-transparent, blends with bg
          boxShadow: "0 6px 32px 0 #000a, 0 1.5px 3px 0 #30010544", // subtle shadow
          mixBlendMode: "lighten", // blends with gradient below
          border: "1.5px solid rgba(76, 72, 74, 0.25)"
        }}
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {buttons.slice(0, 6).map((btn, i) => (
            <button
              key={i}
              className={`
                rounded-xl font-semibold px-10 py-8 shadow-md text-2xl transition
                ${btn.label === "" ? "opacity-40 cursor-not-allowed" : "hover:ring-2 hover:ring-[#d1d5db]"}
              `}
              style={{
                background: "linear-gradient(120deg, #34374b 70%, #23242a 100%)",
                border: 0,
                color: "#f7f7f7",
                minWidth: "180px",
                minHeight: "90px",
                letterSpacing: "0.03em",
                boxShadow: btn.label === "" ? undefined : "0 2px 12px 0 #0005",
                transition: "box-shadow 0.23s, filter 0.23s"
              }}
              disabled={btn.label === ""}
              onMouseEnter={e => {
                if (btn.label !== "") {
                  e.currentTarget.style.filter = "brightness(1.11) saturate(1.04)";
                  e.currentTarget.style.boxShadow = "0 0 32px 0 #b1b3c944, 0 2px 12px 0 #0005";
                }
              }}
              onMouseLeave={e => {
                if (btn.label !== "") {
                  e.currentTarget.style.filter = "brightness(1) saturate(1)";
                  e.currentTarget.style.boxShadow = "0 2px 12px 0 #0005";
                }
              }}
              onClick={() => btn.label && alert(`Navigate to: ${btn.label}`)}
            >
              {btn.label || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
