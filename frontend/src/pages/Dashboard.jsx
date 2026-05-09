import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const generators = [
  {
    label: "YouTube Description Generator",
    path: "/generate/youtube",
    icon: "▶",
  },
  { label: "Blog Generator", path: "/generate/blog", icon: "✍" },
  { label: "Viral Title Generator", path: "/generate/viral-title", icon: "⚡" },
  {
    label: "Freelance Proposal Generator",
    path: "/generate/proposal",
    icon: "📄",
  },
  { label: "Social Hook Generator", path: "/generate/social-hook", icon: "✔" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-purple-400">✨</span>
          <span className="text-sm text-gray-500">Synthora AI</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">
          Pick a generator to start
        </h1>
        <p className="text-gray-400 text-sm mb-10">
          Select a tool and generate high-quality content instantly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generators.map((g) => (
            <Link
              key={g.path}
              to={g.path}
              className="group bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 rounded-xl p-5 flex items-center justify-between transition"
            >
              <div>
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <span>{g.icon}</span> {g.label}
                </div>
                <p className="text-gray-500 text-xs">
                  Open the tool interface and generate output.
                </p>
              </div>
              <span className="text-gray-600 group-hover:text-white transition ml-3">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
