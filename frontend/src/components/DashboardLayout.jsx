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

      {/* Main content — offset on desktop for sidebar, top padding on mobile for top bar */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-white/5 sticky top-0 bg-[#0d0d14] z-10 mt-12 md:mt-0">
          {/* Credits badge */}
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

          {/* Upgrade + Profile */}
          <div className="flex items-center gap-2 md:gap-3">
            {!isPro && (
              <button
                onClick={() => navigate("/billing")}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 md:px-4 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                ⬆ <span className="hidden sm:inline">Upgrade to Pro</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}
            <ProfileDropdown />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
