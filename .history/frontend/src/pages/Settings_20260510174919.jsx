import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

export default function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false, new: false, confirm: false
  });

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    : 'N/A';

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-400 text-sm mb-8">Manage your account preferences.</p>

        {/* Profile Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-semibold text-sm">Profile Information</h2>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
            <input type="text" defaultValue={user?.name}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input type="email" defaultValue={user?.email} disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed" />
            <p className="text-gray-600 text-xs mt-1">Email cannot be changed</p>
          </div>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm">
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-white font-semibold text-sm">Change Password</h2>
          {['current', 'new', 'confirm'].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-400 mb-1.5 block capitalize">
                {field === 'current' ? 'Current Password'
                  : field === 'new' ? 'New Password'
                  : 'Confirm Password'}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field] ? 'text' : 'password'}
                  className="w-full bg-white/5 border bo