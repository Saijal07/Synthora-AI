import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const GENERATORS = [
  {
    key: "youtube",
    label: "YouTube Description",
    icon: "▶",
    topic: "How to build a React app in 2024",
    keywords: "React, JavaScript, tutorial, beginner",
    tone: "Professional",
    output: `🚀 Learn how to build a full-stack React application from scratch in 2024!

In this comprehensive tutorial we cover everything you need to go from zero to deployed:

✅ Setting up your development environment
✅ Creating reusable components with React 19
✅ Managing state with hooks (useState, useEffect, useContext)
✅ Routing with React Router v7
✅ Connecting to a REST API
✅ Deploying to production in minutes

📌 Timestamps:
0:00 — Introduction & what we're building
2:30 — Project setup with Vite
8:15 — Building your first component
22:40 — State management deep dive
35:20 — API integration with Axios
48:00 — Deployment walkthrough

Whether you're a complete beginner or leveling up your React skills, this tutorial has you covered. Drop your questions in the comments — I read every one!

👍 Like, subscribe and hit the bell so you never miss a tutorial.

#React #WebDevelopment #JavaScript #Tutorial #ReactJS #Frontend #Coding #Programming`,
  },
  {
    key: "blog",
    label: "Blog Generator",
    icon: "✍",
    topic: "Top 10 productivity hacks for developers",
    keywords: "productivity, developer, focus, deep work",
    tone: "Casual",
    output: `# Top 10 Productivity Hacks Every Developer Needs in 2024

We all have the same 24 hours. But some developers ship 3x more than their peers. Here's the difference.

## 1. Time-block your deep work sessions
Stop context-switching every 20 minutes. Block 2–3 hour focus windows in your calendar and treat them like client meetings — non-negotiable.

## 2. Kill your notifications (seriously)
Slack, email, Discord — turn them all off during focus blocks. Async communication exists for a reason.

## 3. Use the "two-minute rule"
If a task takes under two minutes, do it now. If it takes longer, schedule it. Decision fatigue is real.

## 4. Write rubber-duck comments before you code
Before touching the keyboard, explain the problem out loud or write it down. You'll catch 40% of bugs before writing a single line.

## 5. Set a daily "done by" target
Pick 1–3 must-ship tasks each morning. Everything else is a bonus. This prevents the illusion of busyness.

## 6. Learn your editor shortcuts
Power users are 30% faster simply because they never leave the keyboard. Invest one week into mastering your editor.

## 7. Review your code after a short break
Fresh eyes catch what tired eyes miss. Even a 10-minute walk rewires your perspective.

## 8. Automate repetitive tasks immediately
If you do something manually twice, script it. The third time never comes.

## 9. Keep a "parking lot" for ideas
When random ideas strike mid-task, dump them in a note and get back to work. Don't lose focus chasing shiny objects.

## 10. End each day with a 5-minute shutdown ritual
Write down what you finished and your top priority for tomorrow. Your brain stops "processing open loops" and you actually rest.

---
*Which hack are you trying first? Let us know in the comments.*`,
  },
  {
    key: "viral-title",
    label: "Viral Title Generator",
    icon: "⚡",
    topic: "Remote work tips for freelancers",
    keywords: "remote work, freelance, productivity",
    tone: "Bold",
    output: `Here are 10 scroll-stopping titles for "Remote work tips for freelancers":

1. "I Worked Remotely for 3 Years — Here Are the 7 Rules That Saved My Career"

2. "Why 90% of Freelancers Fail at Remote Work (And How to Be the 10%)"

3. "The Freelancer's Remote Work Playbook Nobody Talks About"

4. "Stop Working From Your Couch: The Remote Work Setup That 10x'd My Output"

5. "These 5 Remote Work Habits Made Me $120k Freelancing Last Year"

6. "The Brutal Truth About Remote Freelancing (That Productivity Gurus Won't Tell You)"

7. "From Burnout to Booked Solid: My Remote Work Transformation"

8. "Remote Freelancers Are Losing $50k a Year to These 3 Mistakes"

9. "How I Built a 6-Figure Freelance Business From a 1-Bedroom Apartment"

10. "The Remote Work System That Lets Me Work 4 Hours and Still Deliver Premium Results"

---
💡 Tip: Titles with specific numbers, dollar amounts, or timeframes consistently outperform vague ones by 3–5x.`,
  },
  {
    key: "proposal",
    label: "Freelance Proposal",
    icon: "📄",
    topic: "Build a full-stack e-commerce website",
    keywords: "React, Node.js, Stripe, e-commerce",
    tone: "Professional",
    output: `Subject: Proposal — Full-Stack E-Commerce Website Development

Dear [Client Name],

Thank you for reaching out. After reviewing your project brief, I'm confident I can deliver a high-quality, scalable e-commerce platform that meets your business goals.

---

**Project Understanding**
You need a full-stack e-commerce website with product listings, shopping cart, secure checkout, and an admin dashboard — delivered on time and within budget.

**My Approach**

*Phase 1 — Discovery & Design (Week 1)*
Wireframes, user flow mapping, and design system setup.

*Phase 2 — Frontend Development (Weeks 2–3)*
React-based storefront with responsive design, product pages, and cart functionality.

*Phase 3 — Backend & Payments (Weeks 4–5)*
Node.js/Express API, PostgreSQL database, Stripe payment integration, and order management.

*Phase 4 — Testing & Launch (Week 6)*
Cross-browser testing, performance optimization, deployment, and handoff documentation.

**Why Work With Me**
- 5+ years building production e-commerce systems
- Clean, maintainable code with full documentation
- Post-launch support included (30 days)
- You own 100% of the codebase

**Investment**
Project total: $4,500
50% upfront / 50% on delivery

I'm available to start immediately. Let's schedule a 20-minute call to align on requirements.

Best regards,
[Your Name]`,
  },
  {
    key: "social-hook",
    label: "Social Hook Generator",
    icon: "✔",
    topic: "Why most people fail at building habits",
    keywords: "habits, self-improvement, consistency",
    tone: "Inspirational",
    output: `Here are 8 high-engagement hooks for "Why most people fail at building habits":

**Twitter / X:**
1. "You don't lack discipline. You lack a system that works with your brain, not against it. Here's what actually sticks: 🧵"

2. "I failed at building habits for years. Then I learned one thing that changed everything. Most productivity advice is wrong."

**LinkedIn:**
3. "95% of people who start a new habit quit within 2 weeks. I used to be one of them. After studying behavioral science for 3 years, here's what I discovered..."

4. "Hot take: Motivation is the worst way to build habits. Here's what actually works (and why your past failures weren't your fault)."

**Instagram:**
5. "Stop trying to be consistent. Start trying to be forgiving. The habit that survives imperfection is the only one that lasts. 💡"

6. "You've started and quit the same habits 10 times. This is why — and it's not what you think. Save this for when motivation hits. 📌"

**Universal (any platform):**
7. "The #1 reason habits fail has nothing to do with willpower. It's about identity. Let me explain."

8. "Most habit advice is designed to sell you something. This one is designed to actually help. Read to the end."

---
✨ Hook #1 and #7 tend to perform best — they challenge a common belief while promising a payoff.`,
  },
];

const TONES = ["Professional", "Casual", "Witty", "Inspirational", "Bold", "Friendly"];

function useTypewriter(text, speed = 8) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    ref.current = setInterval(() => {
      i += 3;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(ref.current);
      }
    }, speed);
    return () => clearInterval(ref.current);
  }, [text]);

  return { displayed, done };
}

export default function Demo() {
  const [activeKey, setActiveKey] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const active = GENERATORS.find((g) => g.key === activeKey) ?? null;

  const [form, setForm] = useState({ topic: GENERATORS[0].topic, keywords: GENERATORS[0].keywords, tone: GENERATORS[0].tone });
  const [generating, setGenerating] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const { displayed, done } = useTypewriter(outputText);

  useEffect(() => {
    if (!activeKey) return;
    const g = GENERATORS.find((g) => g.key === activeKey);
    setForm({ topic: g.topic, keywords: g.keywords, tone: g.tone });
    setOutputText("");
    setGenerating(false);
  }, [activeKey]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (generating) return;
    setOutputText("");
    setGenerating(true);
    setTimeout(() => {
      setOutputText(active.output);
      setGenerating(false);
    }, 1800);
  };

  const navItems = [
    { key: "youtube", label: "YouTube Description", icon: "▶" },
    { key: "blog", label: "Blog Generator", icon: "✍" },
    { key: "viral-title", label: "Viral Title Generator", icon: "⚡" },
    { key: "proposal", label: "Freelance Proposal", icon: "📄" },
    { key: "social-hook", label: "Social Hook Generator", icon: "✔" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0d0d14] text-white">
      {/* Sidebar */}
      <aside
        className={`w-64 min-h-screen bg-[#0d0d14] border-r border-white/5 flex flex-col fixed left-0 top-0 z-20 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="text-purple-400">✨</span> Synthora AI
          </div>
          <p className="text-gray-600 text-xs mt-0.5">AI Content Automation</p>
        </div>

        {/* Demo badge */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
          <span className="text-yellow-400 text-xs font-semibold">Demo Mode</span>
          <p className="text-gray-500 text-xs mt-0.5">No account needed</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <button
            onClick={() => { setActiveKey(null); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              !activeKey ? "bg-white/10 text-white font-medium" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <span className="w-5 text-center">⊞</span> Home
          </button>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveKey(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                activeKey === item.key
                  ? "bg-white/10 text-white font-medium"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/5 mt-2">
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 text-sm cursor-not-allowed select-none" title="Sign up to access History">
              <span className="w-5 text-center">🕐</span> History
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 text-sm cursor-not-allowed select-none" title="Sign up to access Billing">
              <span className="w-5 text-center">💳</span> Billing
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 text-sm cursor-not-allowed select-none" title="Sign up to access Settings">
              <span className="w-5 text-center">⚙</span> Settings
            </div>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-white/5 space-y-2">
          <Link
            to="/register"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            ✨ Sign Up Free
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 px-3 py-2 rounded-lg text-sm transition"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 sticky top-0 bg-[#0d0d14] z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <span className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full font-medium">
              Demo — 5 credits shown
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-xs px-3 py-1.5 transition"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 md:p-8">
          {/* Home view */}
          {!activeKey && (
            <div className="max-w-5xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-400">✨</span>
                <span className="text-sm text-gray-500">Synthora AI — Demo</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">Pick a generator to try</h1>
              <p className="text-gray-400 text-sm mb-10">
                No sign-up needed. Select a tool and watch AI generate content instantly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveKey(item.key)}
                    className="group bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 rounded-xl p-5 flex items-center justify-between transition text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                        <span>{item.icon}</span> {item.label}
                      </div>
                      <p className="text-gray-500 text-xs">Try the demo with pre-filled examples.</p>
                    </div>
                    <span className="text-gray-600 group-hover:text-white transition ml-3">→</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 bg-purple-600/10 border border-purple-500/20 rounded-2xl p-6 text-center">
                <p className="text-white font-semibold mb-1">Like what you see?</p>
                <p className="text-gray-400 text-sm mb-4">Create a free account and get 50 AI credits — no credit card needed.</p>
                <Link
                  to="/register"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-2.5 rounded-xl text-sm transition"
                >
                  ✨ Sign Up Free — 50 Credits
                </Link>
              </div>
            </div>
          )}

          {/* Generator view */}
          {activeKey && active && (
          <div className="max-w-3xl">
            {/* Header */}
            <button
              onClick={() => setActiveKey(null)}
              className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition"
            >
              ← Back to Home
            </button>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{active.icon}</span>
              <h1 className="text-2xl font-bold text-white">{active.label}</h1>
            </div>
            <p className="text-gray-400 text-sm mb-8">
              This is a live demo — fill in the form and click Generate to see sample AI output.
            </p>

            {/* Form */}
            <form onSubmit={handleGenerate} className="space-y-5 mb-8">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Topic *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
                  placeholder={active.topic}
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
                  Additional Context <span className="text-gray-600">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition resize-none"
                  placeholder="Target audience, specific requirements, extra details..."
                />
              </div>

              <button
                type="submit"
                disabled={generating}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  "✨ Generate Content"
                )}
              </button>
            </form>

            {/* Output */}
            {(displayed || generating) && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                    Generated Output
                    {!done && !generating && (
                      <span className="w-2 h-4 bg-purple-400 animate-pulse inline-block rounded-sm" />
                    )}
                  </h3>
                  {done && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(outputText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-xs text-gray-400 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition"
                    >
                      {copied ? "✓ Copied!" : "📋 Copy"}
                    </button>
                  )}
                </div>
                {generating ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    AI is writing your content...
                  </div>
                ) : (
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                    {displayed}
                    {!done && <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse ml-0.5 rounded-sm align-text-bottom" />}
                  </pre>
                )}
              </div>
            )}

            {/* CTA after output */}
            {done && (
              <div className="mt-6 bg-purple-600/10 border border-purple-500/20 rounded-2xl p-6 text-center">
                <p className="text-white font-semibold mb-1">Ready to create your own content?</p>
                <p className="text-gray-400 text-sm mb-4">
                  Sign up free and get 50 AI credits — no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/register"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
                  >
                    ✨ Sign Up Free — 50 Credits
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
