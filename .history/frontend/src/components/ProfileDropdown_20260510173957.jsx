import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-xs font-bold text-white shadow-lg">
          {initials}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 w-64 bg-[#161622] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-white font-semibold text-sm truncate">
                  {user?.name}
                </p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            </div>

            {/* Plan Badge */}
            <div className="mt-3 flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">{user?.isPro ? "⭐" : "🆓"}</span>
                <span className="text-xs text-gray-300 font-medium">
                  {user?.isPro ? "Pro Plan" : "Free Plan"}
                </span>
              </div>
              {!user?.isPro && (
                <span className="text-xs text-purple-400 font-medium">
                  {user?.freeCredits ?? 0}/5 left
                </span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition text-left"
            >
              <span className="w-4 text-center">⊞</span>
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition text-left"
            >
              <span className="w-4 text-center">⚙</span>
              Settings
            </button>

            <button
              onClick={() => {
                navigate("/billing");
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition text-left"
            >
              <span className="w-4 text-center">💳</span>
              Billing & Credits
            </button>

            {!user?.isPro && (
              <button
                onClick={() => {
                  navigate("/billing");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-500/5 transition text-left"
              >
                <span className="w-4 text-center">⬆</span>
                Upgrade to Pro
              </button>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-white/5 py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition text-left"
            >
              <span className="w-4 text-center">↩</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
