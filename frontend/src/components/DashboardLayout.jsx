import Sidebar from "./Sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const freeLeft = user?.freeCredits ?? 0;
  const totalCredits = user?.totalCredits ?? 50;
  const isPro = user?.isPro;

  return (
    <div className="flex min-h-screen bg-[#0d0d14] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 sticky top-0 bg-[#0d0d14] z-10">
          {/* Left — Credits badge */}
          <div className="flex items-center gap-3 text-sm">
            {isPro ? (
              <span className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full font-medium">
                ⭐ Pro — Unlimited
              </span>
            ) : (
              <span className="text-purple-400 text-xs bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                ✨ {freeLeft}/{totalCredits} credits left
              </span>
            )}
          </div>

          {/* Right — Upgrade + Profile */}
          <div className="flex items-center gap-3">
            {!isPro && (
              <button
                onClick={() => navigate("/billing")}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                ⬆ Upgrade to Pro
              </button>
            )}
            <ProfileDropdown />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
