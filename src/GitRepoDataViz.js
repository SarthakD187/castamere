import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const REPO = "SarthakD187/castamere"; // Change if needed

export default function GitRepoDataViz() {
  const [commits, setCommits] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const commitsRes = await axios.get(`https://api.github.com/repos/${REPO}/commits?per_page=1`);
        setCommits(commitsRes.data);

        const contributorsRes = await axios.get(`https://api.github.com/repos/${REPO}/contributors?per_page=10`);
        setContributors(contributorsRes.data);

        const activityRes = await axios.get(`https://api.github.com/repos/${REPO}/stats/commit_activity`);
        setActivity(
          activityRes.data.slice(-12).map((week, i) => ({
            week: `W${i + 1}`,
            commits: week.total
          }))
        );
      } catch (e) {
        // Optionally show an error
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div
      className={`
        font-mono text-[#cabfa7] text-[0.97rem] mt-2
        rounded-md border border-[#cabfa7] bg-transparent
        px-6 py-5
        shadow transition
      `}
      style={{
        minWidth: "100%",
        boxSizing: "border-box",
      }}
      tabIndex={-1}
    >
      <div className="uppercase tracking-wider text-[0.92rem] mb-2 select-none border-b border-[#322c28] pb-2 font-semibold">
        GitHub Repo Data
      </div>
      {loading ? (
        <div className="text-gray-400 font-mono py-6">Loading…</div>
      ) : (
        <div className="flex flex-col gap-5">

          {/* Most Recent Commit */}
          <div>
            <div className="font-mono text-[0.89rem] text-[#cabfa7] mb-1 tracking-wide select-none">Most Recent Commit</div>
            {commits[0] && (
              <div className="flex flex-col border-b border-[#292420] pb-2 pt-2">
                <div>
                  <span className="font-bold">{commits[0].commit.author.name}</span>
                  <span className="mx-1 text-[#cabfa766]">–</span>
                  <span>{commits[0].commit.message.slice(0, 58)}{commits[0].commit.message.length > 58 ? "..." : ""}</span>
                </div>
                <div className="text-[#cabfa777] text-xs flex items-center">
                  {new Date(commits[0].commit.author.date).toLocaleDateString()}
                  <a
                    href={commits[0].html_url}
                    className="ml-3 underline underline-offset-2 text-[#cabfa7] hover:text-white transition text-[11px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contributors */}
          <div>
            <div className="font-mono text-[0.89rem] text-[#cabfa7] mb-1 tracking-wide select-none">Top Contributors</div>
            <div className="flex flex-wrap gap-2">
              {contributors.map(c => (
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={c.id}
                  className="flex items-center space-x-2 px-2 py-1 border border-[#cabfa7] rounded bg-[#191716] hover:bg-[#292420] hover:text-white transition text-[#cabfa7] text-xs"
                >
                  <img src={c.avatar_url} alt={c.login} className="w-5 h-5 rounded-full border border-[#cabfa7] opacity-80" />
                  <span>{c.login}</span>
                  <span className="text-[10px] text-[#cabfa799]">({c.contributions})</span>
                </a>
              ))}
            </div>
          </div>

          {/* Commit Activity Chart */}
          <div>
            <div className="font-mono text-[0.89rem] text-[#cabfa7] mb-1 tracking-wide select-none">Commits per Week (Last 12 Weeks)</div>
            <div style={{
              width: "100%",
              height: 120,
              background: "#191716",
              borderRadius: "7px",
              padding: "6px",
              border: "1px solid #322c28"
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activity}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#cabfa71a" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: '#cabfa7', fontFamily: 'monospace', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#cabfa7', fontFamily: 'monospace', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip
                    contentStyle={{
                      background: "#191716",
                      border: "1px solid #cabfa7",
                      color: "#cabfa7",
                      fontFamily: "monospace",
                      fontSize: 12
                    }}
                  />
                  <Bar dataKey="commits" fill="#cabfa7" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
