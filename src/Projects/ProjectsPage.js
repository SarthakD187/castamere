import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    name: "AI Article Summarizer",
    description:
      "Summarizes news and blog articles with OpenAI. Paste a link and get a concise summary, powered by a Lambda backend.",
    link: "/summarizer",
  },
  {
    name: "Image Classifier",
    description:
      "A neural network app that classifies images in real-time, trained on custom datasets.",
    link: "https://github.com/yourusername/image-classifier",
  },
  {
    name: "Board Game Tournament",
    description:
      "A site for managing board game tournaments with team signups, live brackets, and college pages.",
    link: "https://main.d3159rux9329vg.amplifyapp.com/",
  },
  {
    name: "Git Repo Data Visualization Board",
    description:
      "A dashboard that tracks this portfolio’s GitHub repository data and displays it at the bottom of the homepage. Explore real-time commits, contributors, and repository stats right on the main page.",
    link: "/",
  },
];

export default function ProjectsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 relative bg-[#191716]">
      {/* Subtle dots background */}
      <div className="noise-bg"></div>

      {/* File directory panel */}
      <div className="w-full max-w-xl bg-[#221f1e]/80 border border-[#39322b] rounded-xl shadow-md p-0 z-10">
        <h2 className="font-mono uppercase tracking-wider text-gray-200 text-base px-8 pt-8 pb-4 border-b border-[#39322b] bg-[#191716]/80 rounded-t-xl select-none">
          /projects
        </h2>
        <ul className="divide-y divide-[#322c28]">
          {projects.map((proj, idx) => (
            <li key={proj.name} className="font-mono">
              <button
                className={`
                  w-full flex items-center justify-between px-8 py-5 text-left text-base md:text-lg font-semibold
                  bg-transparent hover:bg-[#272421] focus:bg-[#272421]
                  text-[#cabfa7] transition select-none
                `}
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>
                  <span className="inline-block mr-2 align-middle">
                    <span className="mr-1" aria-hidden>
                      📁
                    </span>
                  </span>
                  {proj.name}
                </span>
                <span
                  className={`transition-transform ${
                    openIndex === idx ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>
              {openIndex === idx && (
                <div className="pl-14 pr-8 pb-5 pt-1 text-[#e9e5de] text-[0.97rem] border-l-4 border-[#cabfa7] bg-[#181716]/80 rounded-bl-lg animate-fadein">
                  <div className="pb-2">{proj.description}</div>
                  <button
                    onClick={() => {
                      if (proj.link.startsWith("/")) {
                        navigate(proj.link);
                      } else {
                        window.open(proj.link, "_blank", "noopener noreferrer");
                      }
                    }}
                    className="inline-block px-4 py-1 rounded border border-[#cabfa7] text-[#cabfa7] bg-transparent hover:bg-[#292420] hover:text-white transition text-[0.93rem]"
                  >
                    View Project
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
