import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FREE_CREDIT_LIMIT } from "../constants/credits";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalCredits = user?.totalCredits ?? FREE_CREDIT_LIMIT;
  const remainingCredits =
    user?.remainingCredits ??
    (user?.usedCredits != null
      ? totalCredits - user.usedCredits
      : user?.freeCredits) ??
    totalCredits;
  const isPro = user?.isPro;

  return (
    <div className="flex min-h-screen bg-[#0d0d14] text-white">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 sticky top-0 bg-[#0d0d14] z-10">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-medium">Overview</span>
            {isPro ? (
              <span className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                ⭐ Pro
              </span>
            ) : (
              <span className="text-purple-400 text-xs bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                {remainingCredits}/{totalCredits} Credits Left
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            {!isPro && (
              <button
                onClick={() => navigate("/billing")}
                className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg text-xs transition font-medium"
              >
                ⬆ Upgrade to Pro
              </button>
            )}
            <button
              onClick={() => navigate("/settings")}
              className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-purple-700 transition"
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </button>
          </div>
        </div>
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
