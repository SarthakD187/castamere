import React from "react";
import { useNavigate } from "react-router-dom";
import GitRepoDataViz from "./Projects/GitRepoDataViz"; // import your component

const buttons = [
  { label: "Personal Info" },
  { label: "Projects" },
  { label: "Art" },
  { label: "Writing" },
  { label: "Photograph" },
  { label: "" }
];

export default function CastamereHomepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#191716]">
      {/* Subtle dots background */}
      <div className="noise-bg"></div>

      {/* File-directory style archive card */}
      <div className="w-full max-w-xl bg-[#221f1e]/80 border border-[#39322b] rounded-xl shadow-md p-0 z-10">
        <header className="font-mono uppercase tracking-wider text-gray-200 text-base px-8 pt-8 pb-4 border-b border-[#39322b] bg-[#191716]/80 rounded-t-xl select-none">
          /castamere
        </header>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-8 py-8">
          {buttons.slice(0, 6).map((btn, i) => (
            <button
              key={i}
              className={`
                font-mono rounded-md px-8 py-7 text-lg md:text-xl font-semibold
                border border-[#cabfa7] bg-transparent text-[#cabfa7]
                hover:bg-[#292420] hover:text-white focus:bg-[#292420] focus:text-white
                transition select-none
                ${btn.label === "" ? "opacity-40 cursor-not-allowed" : ""}
              `}
              style={{
                minWidth: "150px",
                minHeight: "68px",
                letterSpacing: "0.03em",
                outline: "none",
                boxShadow: "none",
              }}
              disabled={btn.label === ""}
              onClick={() => {
                if (btn.label === "Projects") {
                  navigate("/projects");
                } else if (btn.label) {
                  alert(`Navigate to: ${btn.label}`);
                }
              }}
            >
              {btn.label || ""}
            </button>
          ))}

          {/* Git Repo Data Viz spans both columns */}
          <div className="col-span-2 mt-4">
            <GitRepoDataViz />
          </div>
        </div>
      </div>
    </div>
  );
}
