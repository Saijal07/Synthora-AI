import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(token ? "" : "Reset token is missing.");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        token,
        newPassword: form.newPassword,
      });
      setForm({ newPassword: "", confirmPassword: "" });
      setMessage(
        res.apiMessage ||
          res.data?.message ||
          "Password reset successfully. You can sign in now.",
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
            <span className="text-purple-400">*</span> Synthora AI
          </div>
          <p className="text-gray-400 text-sm">Choose a new password</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg mb-5">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                disabled={!token || Boolean(message)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition disabled:opacity-60"
                placeholder="Min. 6 characters"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">
                Confirm Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                disabled={!token || Boolean(message)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition disabled:opacity-60"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading || !token || Boolean(message)}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Back to{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300">
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
