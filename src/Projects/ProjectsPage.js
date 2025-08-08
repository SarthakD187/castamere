/* src/Projects/ProjectsPage.jsx */

import React, { useState, lazy, Suspense } from "react";

/* ─── Lazy-load local project components ─── */
const projectComponents = {
  summarizer:    lazy(() => import("./Summarizer")),
  gitrepoviz:    lazy(() => import("./GitRepoDataViz")),
  stockmarkdash: lazy(() => import("./StockMarketDashboard")),
  /* “boardgame” is shown with an <iframe> */
};

/* ─── Project catalogue ─── */
const projects = [
  {
    id: 1,
    title: "AI Article Summarizer",
    compKey: "summarizer",
    description:
      "Full-stack React app with AWS Lambda + OpenAI that auto-summarises any URL.",
    tech: ["React", "Amplify", "OpenAI", "Lambda"],
    link: "https://github.com/…",
  },
  {
    id: 2,
    title: "Board Game Website",
    compKey: "boardgame", // iframe preview
    description:
      "Marketing site that lets colleges host bracketed board-game tournaments.",
    tech: ["Next.js", "Amplify", "RDS", "Stripe"],
    externalUrl: "https://main.d3159rux9329vg.amplifyapp.com/",
    link: "https://github.com/…",
  },
  {
    id: 3,
    title: "Git Repo Data Viz",
    compKey: "gitrepoviz",
    description:
      "Interactive dashboard that visualises commit history for any GitHub repo.",
    tech: ["React", "D3", "GitHub API"],
    link: "https://github.com/…",
  },
  {
    id: 4,
    title: "Stock Market Dashboard",
    compKey: "stockmarkdash",
    description: "Dashboard that visualises live stock-market data.",
    tech: ["React", "Amplify", "Lambda"],
    link: "https://github.com/…",
  },
];

export default function ProjectsSection({ sectionRef }) {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active  = projects.find((p) => p.id === activeId);

  /* Resolve component (null for boardgame) */
  const ActiveComp =
    active.compKey && projectComponents[active.compKey]
      ? projectComponents[active.compKey]
      : null;

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* ───── LEFT • FEATURED ───── */}
        <div className="flex flex-col gap-6 bg-white px-8 py-12 lg:p-16">
          <h2 className="text-4xl font-bold">Featured&nbsp;Projects</h2>

          {/* Preview */}
          <div className="flex-1 rounded-xl overflow-hidden border bg-[#181716]">
            {ActiveComp ? (
              <Suspense fallback={<div className="w-full h-full bg-gray-200" />}>
                <ActiveComp previewMode />
              </Suspense>
            ) : active.compKey === "boardgame" ? (
              <iframe
                key={active.externalUrl}
                src={active.externalUrl}
                title={active.title}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <h3 className="text-2xl font-semibold">{active.title}</h3>
          <p className="text-gray-800">{active.description}</p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {active.tech.map((t) => (
              <span
                key={t}
                className="bg-[#3461eb]/10 text-[#3461eb] text-xs font-medium px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="space-x-3">
            {active.compKey === "boardgame" && (
              <a
                href={active.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#FF5800] hover:bg-[#d14b00] text-white font-medium px-6 py-2 rounded-lg transition"
              >
                Live&nbsp;Demo&nbsp;↗
              </a>
            )}
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#3461eb] hover:bg-[#2949b4] text-white font-medium px-6 py-2 rounded-lg transition"
              >
                View&nbsp;Code&nbsp;↗
              </a>
            )}
          </div>
        </div>

        {/* ───── RIGHT • LIST ───── */}
        <aside className="bg-white pt-5 px-6 py-10 lg:p-12">
          <h2 className="text-xl font-bold text-center mb-6 text-black">
            Project&nbsp;list
          </h2>

          <div className="space-y-3">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`w-full text-left px-5 py-3 rounded-lg border transition
                  ${
                    p.id === activeId
                      ? "bg-[#3461eb] text-white border-[#3461eb]"
                      : "bg-gray-100 hover:bg-gray-200 border-transparent"
                  }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
