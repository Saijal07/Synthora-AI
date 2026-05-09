import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const CONFIG = {
  youtube: {
    label: "YouTube Description Generator",
    type: "YOUTUBE_DESCRIPTION",
    icon: "▶",
    placeholder: "e.g. How to build a React app in 2024",
  },
  blog: {
    label: "Blog Generator",
    type: "BLOG_POST",
    icon: "✍",
    placeholder: "e.g. Top 10 productivity hacks for developers",
  },
  "viral-title": {
    label: "Viral Title Generator",
    type: "VIRAL_TITLE",
    icon: "⚡",
    placeholder: "e.g. Remote work tips for freelancers",
  },
  proposal: {
    label: "Freelance Proposal Generator",
    type: "FREELANCE_PROPOSAL",
    icon: "📄",
    placeholder: "e.g. Build a full-stack e-commerce website",
  },
  "social-hook": {
    label: "Social Hook Generator",
    type: "SOCIAL_HOOK",
    icon: "✔",
    placeholder: "e.g. Why most people fail at building habits",
  },
};

const TONES = [
  "Professional",
  "Casual",
  "Witty",
  "Inspirational",
  "Bold",
  "Friendly",
];

export default function Generate() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const config = CONFIG[type];

  const [form, setForm] = useState({
    topic: "",
    keywords: "",
    tone: "Professional",
    extraInput: "",
  });
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!config) navigate("/dashboard");
  }, [type]);

  useEffect(() => {
    if (!jobId) return;
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/content/jobs/${jobId}`);
        if (res.data.status === "COMPLETED") {
          setResult(res.data.generatedContent);
          setLoading(false);
          refreshUser();
          clearInterval(interval);
        } else if (res.data.status === "FAILED") {
          setError("Generation failed. Please try again.");
          setLoading(false);
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post("/content/generate", {
        generatorType: config.type,
        topic: form.topic,
        keywords: form.keywords,
        tone: form.tone,
        extraInput: form.extraInput,
      });
      refreshUser();
      setJobId(res.data.id);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  if (!config) return null;

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition"
        >
          ← Back to Dashboard
        </button>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{config.icon}</span>
          <h1 className="text-2xl font-bold text-white">{config.label}</h1>
        </div>
        <p className="text-gray-400 text-sm mb-8">
          Fill in the details and let AI do the work.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Topic *
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
              placeholder={config.placeholder}
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Keywords <span className="text-gray-600">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
              placeholder="e.g. React, JavaScript, tutorial"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Tone</label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setForm({ ...form, tone })}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${
                    form.tone === tone
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Additional Context{" "}
              <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition resize-none"
              placeholder="Target audience, specific requirements, extra details..."
              value={form.extraInput}
              onChange={(e) => setForm({ ...form, extraInput: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 text-sm font-medium">{error}</p>
              {error.includes("upgrade") || error.includes("free") ? (
                <button
                  onClick={() => navigate("/billing")}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  ⬆ Upgrade to Pro
                </button>
              ) : null}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Content"
            )}
          </button>
        </form>

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">
                Generated Output
              </h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-xs text-gray-400 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
              {result}
            </pre>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
