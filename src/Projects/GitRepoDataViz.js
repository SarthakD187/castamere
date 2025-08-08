import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const REPO = "SarthakD187/castamere"; // change if needed

export default function GitRepoDataViz({ previewMode = false }) {
  const [commits, setCommits] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ───────── Fetch data once ───────── */
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const commitsRes = await axios.get(
          `https://api.github.com/repos/${REPO}/commits?per_page=1`
        );
        setCommits(commitsRes.data);

        const contributorsRes = await axios.get(
          `https://api.github.com/repos/${REPO}/contributors?per_page=10`
        );
        setContributors(contributorsRes.data);

        const activityRes = await axios.get(
          `https://api.github.com/repos/${REPO}/stats/commit_activity`
        );
        setActivity(
          activityRes.data.slice(-12).map((week, i) => ({
            week: `W${i + 1}`,
            commits: week.total,
          }))
        );
      } catch (e) {
        /* swallow */
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  /* ───────── Light vs. Dark palette ───────── */
  const palette = previewMode
    ? {
        bg: "bg-white",
        card: "bg-white border border-gray-200",
        text: "text-gray-900",
        sub: "text-gray-600",
        badgeBG: "bg-[#3461eb]/10",
        badgeBorder: "border-gray-300",
        badgeText: "text-[#3461eb]",
        chartBG: "#f8f8f8",
        chartBorder: "#e5e7eb",
        gridStroke: "#a3a3a31a",
        axis: "#0f172a",
        bar: "#3461eb",
        tooltipBG: "#ffffff",
        tooltipBorder: "#3461eb",
        tooltipText: "#0f172a",
      }
    : {
        bg: "bg-transparent",
        card: "bg-[#221f1e]/80 border border-[#39322b]",
        text: "text-[#cabfa7]",
        sub: "text-[#cabfa777]",
        badgeBG: "bg-[#191716]",
        badgeBorder: "border-[#cabfa7]",
        badgeText: "text-[#cabfa7]",
        chartBG: "#191716",
        chartBorder: "#322c28",
        gridStroke: "#cabfa71a",
        axis: "#cabfa7",
        bar: "#cabfa7",
        tooltipBG: "#191716",
        tooltipBorder: "#cabfa7",
        tooltipText: "#cabfa7",
      };

  return (
    <div
      className={`font-mono ${palette.text} text-[0.97rem] rounded-md shadow ${palette.card} px-6 py-5`}
      style={{ minWidth: "100%", boxSizing: "border-box" }}
      tabIndex={-1}
    >
      <div
        className={`uppercase tracking-wider text-[0.92rem] mb-3 select-none border-b pb-2 font-semibold ${
          previewMode ? "border-gray-200" : "border-[#322c28]"
        }`}
      >
        GitHub&nbsp;Repo&nbsp;Data
      </div>

      {loading ? (
        <div className={`${palette.sub} py-6`}>Loading…</div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Most Recent Commit */}
          <div>
            <div className={`text-[0.89rem] mb-1 select-none ${palette.text}`}>
              Most Recent Commit
            </div>
            {commits[0] && (
              <div
                className={`flex flex-col pb-3 border-b ${
                  previewMode ? "border-gray-200" : "border-[#292420]"
                }`}
              >
                <div>
                  <span className="font-bold">
                    {commits[0].commit.author.name}
                  </span>
                  <span className="mx-1 opacity-60">–</span>
                  <span>
                    {commits[0].commit.message.slice(0, 58)}
                    {commits[0].commit.message.length > 58 ? "…" : ""}
                  </span>
                </div>
                <div
                  className={`text-xs flex items-center gap-3 ${palette.sub}`}
                >
                  {new Date(
                    commits[0].commit.author.date
                  ).toLocaleDateString()}
                  <a
                    href={commits[0].html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline underline-offset-2 ${
                      previewMode
                        ? "text-[#3461eb] hover:text-[#2543a5]"
                        : "text-[#cabfa7] hover:text-white"
                    } text-[11px] transition`}
                  >
                    View
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contributors */}
          <div>
            <div className={`text-[0.89rem] mb-1 select-none ${palette.text}`}>
              Top Contributors
            </div>
            <div className="flex flex-wrap gap-2">
              {contributors.map((c) => (
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={c.id}
                  className={`flex items-center space-x-2 px-2 py-1 rounded text-xs transition
                    ${palette.badgeBG} ${palette.badgeText} ${palette.badgeBorder}
                    hover:bg-opacity-80`}
                >
                  <img
                    src={c.avatar_url}
                    alt={c.login}
                    className={`w-5 h-5 rounded-full border opacity-80 ${palette.badgeBorder}`}
                  />
                  <span>{c.login}</span>
                  <span className="text-[10px] opacity-60">
                    ({c.contributions})
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Commit Activity Chart */}
          <div>
            <div className={`text-[0.89rem] mb-1 select-none ${palette.text}`}>
              Commits per Week&nbsp;(Last&nbsp;12&nbsp;Weeks)
            </div>
            <div
              style={{
                width: "100%",
                height: 140,
                background: palette.chartBG,
                borderRadius: "7px",
                padding: "6px",
                border: `1px solid ${palette.chartBorder}`,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activity}>
                  <CartesianGrid
                    strokeDasharray="2 3"
                    stroke={palette.gridStroke}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{
                      fill: palette.axis,
                      fontFamily: "monospace",
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: palette.axis,
                      fontFamily: "monospace",
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      background: palette.tooltipBG,
                      border: `1px solid ${palette.tooltipBorder}`,
                      color: palette.tooltipText,
                      fontFamily: "monospace",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="commits" fill={palette.bar} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
