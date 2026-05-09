import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

const TYPE_META = {
  YOUTUBE_DESCRIPTION: {
    label: "YouTube Description",
    icon: "▶",
    color: "text-red-400",
  },
  BLOG_POST: { label: "Blog Post", icon: "✍", color: "text-blue-400" },
  VIRAL_TITLE: { label: "Viral Title", icon: "⚡", color: "text-yellow-400" },
  FREELANCE_PROPOSAL: {
    label: "Freelance Proposal",
    icon: "📄",
    color: "text-green-400",
  },
  SOCIAL_HOOK: { label: "Social Hook", icon: "✔", color: "text-purple-400" },
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api
      .get("/content/history")
      .then((res) => setHistory(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-white mb-1">History</h1>
        <p className="text-gray-400 text-sm mb-8">
          All your previously generated content.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-3">📭</p>
            <p>No generations yet. Pick a generator to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const meta = TYPE_META[item.generatorType] || {
                label: item.generatorType,
                icon: "✦",
                color: "text-gray-400",
              };
              const isOpen = expanded === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/8 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-base ${meta.color}`}>
                        {meta.icon}
                      </span>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {item.topic}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {meta.label} ·{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === "COMPLETED"
                            ? "bg-green-500/10 text-green-400"
                            : item.status === "FAILED"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>
                  </button>
                  {isOpen && item.generatedContent && (
                    <div className="px-5 pb-5 pt-4 border-t border-white/5">
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                        {item.generatedContent}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
