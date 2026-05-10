import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";

export default function Billing() {
  const { user } = useAuth();
  const isPro = user?.isPro;
  const totalCredits = user?.totalCredits ?? 50;
  const remainingCredits = user?.freeCredits ?? totalCredits;

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-white mb-1">Billing</h1>
        <p className="text-gray-400 text-sm mb-8">Manage your plan.</p>

        {/* Current usage */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current Plan</p>
            <p className="text-2xl font-bold text-white mt-1">
              {isPro ? "⭐ Pro" : "🆓 Free"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Available Credits</p>
            <p className="text-3xl font-bold text-white">
              {isPro ? "∞" : `${remainingCredits} / ${totalCredits}`}
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Free Plan */}
          <div
            className={`border rounded-2xl p-6 ${!isPro ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 bg-white/5"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-lg">Free</h3>
              {!isPro && (
                <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white mb-5">$0</p>
            <ul className="space-y-2 mb-6">
              {[
                `${totalCredits} AI credits included`,
                "Access all AI generators",
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
            <button
              disabled
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-gray-500 cursor-not-allowed"
            >
              {!isPro ? "Current Plan" : "Downgrade"}
            </button>
          </div>

          {/* Pro Plan */}
          <div
            className={`border rounded-2xl p-6 ${isPro ? "border-yellow-500/50 bg-yellow-500/5" : "border-white/10 bg-white/5"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-lg">Pro</h3>
              {isPro && (
                <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white mb-5">$9 / mo</p>
            <ul className="space-y-2 mb-6">
              {[
                "Unlimited generations",
                "Access all AI generators",
                "Priority AI",
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
            <button
              disabled={isPro}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
                isPro
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isPro ? "Current Plan" : "Upgrade (Demo)"}
            </button>
          </div>
        </div>

        {/* Warning if out of credits */}
        {!isPro && remainingCredits === 0 && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-red-400 text-sm font-medium">
              You've used all {totalCredits} credits.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Upgrade to Pro for unlimited access.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
