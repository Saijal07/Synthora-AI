import { Link } from "react-router-dom";

export default function Landing() {
  const generators = [
    {
      icon: "▶",
      title: "YouTube Description",
      desc: "SEO-optimized descriptions that get clicks and views.",
    },
    {
      icon: "✍",
      title: "Blog Generator",
      desc: "Full blog posts with headings, intros and conclusions.",
    },
    {
      icon: "⚡",
      title: "Viral Title Generator",
      desc: "10 scroll-stopping titles for any topic instantly.",
    },
    {
      icon: "✔",
      title: "Social Hook Generator",
      desc: "Hooks for Twitter, LinkedIn and Instagram.",
    },
    {
      icon: "📄",
      title: "Freelance Proposal",
      desc: "Win clients with persuasive, professional proposals.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-purple-400">✨</span>
          <span className="hidden sm:inline">Synthora AI</span>
          <span className="sm:hidden">Synthora</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#generators" className="hover:text-white transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>
          <Link to="/login" className="hover:text-white transition">
            Login
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="md:hidden text-sm text-gray-400 hover:text-white px-3 py-1.5"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pt-20 md:pt-28 pb-16">
        <div className="text-xs text-purple-400 border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 rounded-full mb-6">
          ✨ AI Content Automation
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-5">
          Turn Ideas Into Viral
          <br />
          Content in Seconds
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mb-8">
          Generate YouTube descriptions, blog posts, proposals and viral titles
          using AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base flex items-center justify-center gap-2"
          >
            ✨ Start Creating
          </Link>
          <Link
            to="/demo"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base flex items-center justify-center gap-2"
          >
            ▶ Try Demo
          </Link>
        </div>

        {/* Trust Badge */}
        <p className="text-gray-500 text-xs flex items-center gap-2 flex-wrap justify-center">
          <span className="text-green-400">✓</span> 50 Free Credits
          <span className="text-gray-700">•</span>
          <span className="text-green-400">✓</span> No Credit Card Required
          <span className="text-gray-700">•</span>
          <span className="text-green-400">✓</span> Instant Results
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-4xl w-full">
          {[
            {
              title: "Fast generations",
              desc: "Smooth, lightweight UI that feels instant.",
            },
            {
              title: "Clean outputs",
              desc: "Structured content you can copy or export.",
            },
            {
              title: "Built to Scale",
              desc: "Grow your content production without limits.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/8 rounded-xl p-5 text-left"
            >
              <p className="font-semibold text-sm text-white mb-1">{f.title}</p>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generators Section */}
      <div id="generators" className="px-6 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Powerful AI Generators
            </h2>
            <p className="text-gray-400 text-sm">
              5 tools. One platform. Unlimited content ideas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generators.map((g) => (
              <div
                key={g.title}
                className="bg-white/5 hover:bg-white/8 border border-white/8 hover:border-purple-500/30 rounded-xl p-5 transition group"
              >
                <div className="text-2xl mb-3">{g.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-400 transition">
                  {g.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
            {/* CTA Card */}
            <div className="bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-xl p-5 transition flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-3">✨</div>
                <h3 className="text-purple-400 font-semibold text-sm mb-1">
                  More coming soon
                </h3>
                <p className="text-gray-500 text-xs">
                  LinkedIn posts, SEO content, email copy and more.
                </p>
              </div>
              <Link
                to="/register"
                className="mt-4 text-xs text-purple-400 hover:text-white transition font-medium"
              >
                Get early access →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Simple Pricing
            </h2>
            <p className="text-gray-400 text-sm">
              Start free. Upgrade when you're ready.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Free */}
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-1">Free</h3>
              <p className="text-3xl font-bold text-white mb-1">$0</p>
              <p className="text-gray-500 text-xs mb-5">Forever free</p>
              <ul className="space-y-2 mb-6">
                {[
                  "50 monthly AI credits",
                  "Access all AI generators",
                  "Credits reset every 30 days",
                  "History",
                  "Copy output",
                ].map((f) => (
                  <li
                    key={f}
                    className="text-gray-400 text-sm flex items-center gap-2"
                  >
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="block w-full text-center bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Get Started Free
              </Link>
            </div>
            {/* Pro */}
            <div className="border border-purple-500/50 bg-purple-500/5 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Pro</h3>
              <p className="text-3xl font-bold text-white mb-1">
                $9<span className="text-lg font-normal text-gray-400">/mo</span>
              </p>
              <p className="text-gray-500 text-xs mb-5">Billed monthly</p>
              <ul className="space-y-2 mb-6">
                {[
                  "Unlimited generations",
                  "Access all AI generators",
                  "Priority AI ",
                  "History",
                  "No limits ever",
                ].map((f) => (
                  <li
                    key={f}
                    className="text-gray-400 text-sm flex items-center gap-2"
                  >
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Upgrade(Demo)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="text-purple-400">✨</span> Synthora AI
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a href="#generators" className="hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-white transition">
                Sign Up
              </Link>
            </div>
            <p className="text-gray-600 text-xs text-center">
              © 2026 Synthora AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
