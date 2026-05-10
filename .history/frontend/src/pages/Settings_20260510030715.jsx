import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import api from "../api/axios";

function PasswordField({ label, value, visible, onToggle, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1.5 block">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-white text-sm focus:outline-none focus:border-purple-500 transition"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          👁️
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setName(user?.name || "");
  }, [user?.name]);

  useEffect(() => {
    if (!user?.createdAt) {
      refreshUser().catch(() => {});
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const setPasswordValue = (field, value) => {
    setPasswordMessage(null);
    setPasswordForm({ ...passwordForm, [field]: value });
  };

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords({
      ...visiblePasswords,
      [field]: !visiblePasswords[field],
    });
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    try {
      await api.put("/me", { name });
      await refreshUser();
      showToast("Profile updated successfully");
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match" });
      showToast("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    try {
      await api.put("/me/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordMessage({
        type: "success",
        text: "Password updated successfully",
      });
      showToast("Password updated successfully");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to update password";
      setPasswordMessage({ type: "error", text: message });
      showToast(message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const totalCredits = user?.totalCredits ?? 50;
  const remainingCredits = user?.remainingCredits ?? totalCredits;
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "May 2026";
  const canUpdatePassword =
    passwordForm.currentPassword &&
    passwordForm.newPassword &&
    passwordForm.confirmPassword &&
    !passwordLoading;

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        {toast && (
          <div className="fixed right-8 top-20 z-50 bg-white/10 border border-white/10 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
            {toast}
          </div>
        )}

        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-400 text-sm mb-6">
          Manage your account preferences.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleProfileSave}
            disabled={profileLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
          >
            {profileLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 mt-5">
          <h2 className="text-lg font-bold text-white">Change Password</h2>
          <PasswordField
            label="Current Password"
            value={passwordForm.currentPassword}
            visible={visiblePasswords.currentPassword}
            onToggle={() => togglePasswordVisibility("currentPassword")}
            onChange={(e) =>
              setPasswordValue("currentPassword", e.target.value)
            }
          />
          <PasswordField
            label="New Password"
            value={passwordForm.newPassword}
            visible={visiblePasswords.newPassword}
            onToggle={() => togglePasswordVisibility("newPassword")}
            onChange={(e) => setPasswordValue("newPassword", e.target.value)}
          />
          <PasswordField
            label="Confirm Password"
            value={passwordForm.confirmPassword}
            visible={visiblePasswords.confirmPassword}
            onToggle={() => togglePasswordVisibility("confirmPassword")}
            onChange={(e) =>
              setPasswordValue("confirmPassword", e.target.value)
            }
          />
          {passwordMessage && (
            <p
              className={`text-sm ${
                passwordMessage.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {passwordMessage.text}
            </p>
          )}
          <button
            onClick={handlePasswordSave}
            disabled={!canUpdatePassword}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-5">
          <h2 className="text-lg font-bold text-white mb-3">Account Info</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">
              Plan:{" "}
              <span className="text-white">{user?.isPro ? "Pro" : "Free"}</span>
            </p>
            <p className="text-gray-400">
              Credits Remaining:{" "}
              <span className="text-white">{remainingCredits}</span>
            </p>
            <p className="text-gray-400">
              Member Since: <span className="text-white">{memberSince}</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
