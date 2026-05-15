import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.163-3.592M6.53 6.533A9.955 9.955 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.966 9.966 0 01-4.293 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 00-2.83 2M3 3l18 18" />
    </svg>
  );
}

export default function Settings() {
  const { user, refreshUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleProfileSave = async () => {
    if (!name.trim()) return;
    setProfileSaving(true);
    setProfileMsg({ type: "", text: "" });
    try {
      await api.put("/user/profile", { name: name.trim() });
      await refreshUser();
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update profile." });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMsg({ type: "", text: "" });
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordMsg({ type: "error", text: "All password fields are required." });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwords.new.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    setPasswordSaving(true);
    try {
      await api.post("/user/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password." });
    } finally {
      setPasswordSaving(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-400 text-sm mb-8">
          Manage your account preferences.
        </p>

        {/* Profile Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-semibold text-sm">Profile Information</h2>
          {profileMsg.text && (
            <div className={`text-sm px-4 py-3 rounded-lg border ${profileMsg.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
              {profileMsg.text}
            </div>
          )}
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
            />
            <p className="text-gray-600 text-xs mt-1">Email cannot be changed</p>
          </div>
          <button
            onClick={handleProfileSave}
            disabled={profileSaving || !name.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
          >
            {profileSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-semibold text-sm">Change Password</h2>
          {passwordMsg.text && (
            <div className={`text-sm px-4 py-3 rounded-lg border ${passwordMsg.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
              {passwordMsg.text}
            </div>
          )}
          {["current", "new", "confirm"].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-400 mb-1.5 block">
                {field === "current" ? "Current Password" : field === "new" ? "New Password" : "Confirm New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field] ? "text" : "password"}
                  value={passwords[field]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [field]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition pr-10"
                  placeholder={field === "current" ? "Your current password" : "Min. 6 characters"}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPasswords((p) => ({ ...p, [field]: !p[field] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  <EyeIcon open={showPasswords[field]} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handlePasswordChange}
            disabled={passwordSaving}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
          >
            {passwordSaving ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* Account Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold text-sm mb-4">
            Account Info
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Plan</span>
              <span
                className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                  user?.isPro
                    ? "text-yellow-400 bg-yellow-500/10"
                    : "text-purple-400 bg-purple-500/10"
                }`}
              >
                {user?.isPro ? "⭐ Pro" : "🆓 Free"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Credits Remaining</span>
              <span className="text-white text-sm font-medium">
                {user?.isPro
                  ? "Unlimited"
                  : `${user?.freeCredits ?? 0} / ${user?.totalCredits ?? 50}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Member Since</span>
              <span className="text-white text-sm font-medium">
                {memberSince}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Role</span>
              <span className="text-gray-300 text-sm">
                {user?.role ?? "USER"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
