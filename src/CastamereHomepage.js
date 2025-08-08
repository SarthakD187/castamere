import React, { useRef } from "react";
import ProjectsSection from "./Projects/ProjectsPage";   // ⬅️ NEW IMPORT

export default function CastamereHomepage() {
  const heroRef  = useRef(null);
  const workRef  = useRef(null);
  const storyRef = useRef(null);
  const chatRef  = useRef(null);

  const scrollTo = (r) =>
    r.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const nav = [
    { label: "Hey",   ref: heroRef },
    { label: "Work",  ref: workRef },
    { label: "Story", ref: storyRef },
    { label: "Chat",  ref: chatRef },
  ];

  return (
    <div className="w-full relative">
      {/* GLOBAL GRADIENT BACKDROP */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #FF5800 0%, #FF5800 50%, #ffffff 85%)",
        }}
      />

      {/* PILL NAV */}
      <nav className="fixed top-3 inset-x-0 flex justify-center z-20">
        <ul className="flex gap-4 px-4 py-2 rounded-full bg-black/85 text-white text-sm md:text-base font-medium shadow-lg">
          {nav.map(({ label, ref }) => (
            <li key={label}>
              <button
                onClick={() => scrollTo(ref)}
                className="px-3 py-1 rounded-full hover:bg-white/10 focus:bg-[#3461eb] transition"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #FF5800 0%, #FF5800 50%, #ffffff 85%)",
          }}
        />
        <div className="absolute bottom-2 left-2 md:bottom-8 md:left-8">
          <p className="max-w-xl text-[1.5rem] leading-snug font-light text-black">
            Hey! Welcome to my portfolio! This is an archive of projects amongst other things.
          </p>
          <h1
            className="
              mt-10 font-noir leading-[0.9] break-words select-none
              text-[clamp(3.5rem,12vw,9rem)] text-black
            "
          >
            Sarthak&nbsp;Darekar
          </h1>
        </div>
      </section>

      {/* WORK – animated card grid */}
      <ProjectsSection sectionRef={workRef} />   {/* ⬅️ REPLACES OLD PLACEHOLDER */}

      {/* STORY */}
      <section ref={storyRef} className="py-24 px-6 md:px-16 bg-[#f8f8f8]">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#3461eb]">
          My&nbsp;Story
        </h2>
        {/* bio / timeline */}
      </section>

      {/* CHAT */}
      <section ref={chatRef} className="py-24 px-6 md:px-16 bg-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#3461eb]">
          Let’s&nbsp;Chat
        </h2>
        {/* contact links / form */}
      </section>
    </div>
  );
}
