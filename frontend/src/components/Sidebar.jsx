import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/dashboard", icon: "⊞" },
  { label: "YouTube Description", path: "/generate/youtube", icon: "▶" },
  { label: "Blog Generator", path: "/generate/blog", icon: "✍" },
  { label: "Viral Title Generator", path: "/generate/viral-title", icon: "⚡" },
  { label: "Freelance Proposal", path: "/generate/proposal", icon: "📄" },
  { label: "Social Hook Generator", path: "/generate/social-hook", icon: "✔" },
  { label: "History", path: "/history", icon: "🕐" },
  { label: "Billing", path: "/billing", icon: "💳" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#0d0d14] border-b border-white/5 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-bold text-white">
          <span className="text-purple-400">✨</span> Synthora AI
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            /* X icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-30 h-full w-64 bg-[#0d0d14] border-r border-white/5 flex flex-col
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="text-purple-400">✨</span> Synthora AI
            </div>
            <NavLink
              to="/"
              onClick={handleNavClick}
              className="text-gray-600 hover:text-gray-300 transition"
              title="Back to Landing Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </NavLink>
          </div>
          <p className="text-gray-600 text-xs mt-0.5">AI Content Automation</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={() => {
              logout();
              navigate("/");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-white/5 transition"
          >
            <span className="w-5 text-center">↩</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
