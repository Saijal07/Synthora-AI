import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d14] border-r border-white/5 flex flex-col fixed left-0 top-0 z-20">
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-2 font-bold text-white">
          <span className="text-purple-400">✨</span> Synthora AI
        </div>
        <p className="text-gray-600 text-xs mt-0.5">AI Content Automation</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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

      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-white/5 transition"
        >
          ↩ Logout
        </button>
      </div>
    </aside>
  );
}
