import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/* ——— project data ——— */
const projects = [
  {
    name: "AI Article Summarizer",
    description:
      "Paste any link & get a concise summary via OpenAI + Lambda backend.",
    link: "/summarizer",
  },
  {
    name: "Image Classifier",
    description:
      "A neural-network app that classifies images in real-time, trained on custom datasets.",
    link: "https://github.com/yourusername/image-classifier",
  },
  {
    name: "Board Game Tournament",
    description:
      "Manage tournaments with team sign-ups, live brackets & college pages.",
    link: "https://main.d3159rux9329vg.amplifyapp.com/",
  },
  {
    name: "Git Repo Data Viz Board",
    description:
      "Tracks portfolio repo data (commits, contributors, stats) live on the homepage.",
    link: "/",
  },
  {
    name: "Stock Market Dashboard",
    description:
      "Real-time prices & trends pulled from the Finnhub API.",
    link: "/stock-market-dashboard",
  },
];

export default function ProjectsSection({ sectionRef }) {
  const navigate = useNavigate();

  /* card hover motion */
  const hover = {
    scale: 1.04,
    rotateX: 4,
    rotateY: -4,
    boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 px-6 md:px-16 bg-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-14 text-[#0E79B2]">
        Featured&nbsp;Projects
      </h2>

      {/* responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((proj) => (
          <motion.div
            key={proj.name}
            whileHover={hover}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              relative aspect-[4/3] rounded-2xl bg-[#fdfdfd] border border-gray-200
              shadow-lg overflow-hidden cursor-pointer group
            "
            onClick={() => {
              if (proj.link.startsWith("/")) navigate(proj.link);
              else window.open(proj.link, "_blank", "noopener noreferrer");
            }}
          >
            {/* title */}
            <div className="p-6 flex flex-col h-full justify-between">
              <h3 className="text-xl font-semibold text-black group-hover:text-[#BF1363] transition">
                {proj.name}
              </h3>

              {/* arrow badge */}
              <ArrowUpRight
                size={28}
                className="text-[#BF1363] opacity-0 group-hover:opacity-100 transition-all duration-200 self-end"
              />
            </div>

            {/* overlay on hover */}
            <div
              className="
                absolute inset-0 bg-white/90 backdrop-blur-sm p-6 flex items-center justify-center
                text-center text-gray-800 text-[0.95rem] opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              {proj.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
