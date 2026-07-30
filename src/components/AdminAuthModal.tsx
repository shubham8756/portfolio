import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, AlertCircle, Check, Eye, EyeOff, LogOut, Settings, RefreshCw } from 'lucide-react';

interface AdminAuthModalProps {
  isAdmin: boolean;
  onLogin: (passcode: string) => boolean;
  onLogout: () => void;
  onChangePasscode: (newPasscode: string) => void;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isAdmin,
  onLogin,
  onLogout,
  onChangePasscode,
  onClose,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'change_password'>('login');
  
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = onLogin(passcode);
    if (success) {
      setPasscode('');
      onClose();
    } else {
      setErrorMsg('Incorrect admin passcode. Please try again.');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPass.length < 4) {
      setErrorMsg('Passcode must be at least 4 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      setErrorMsg('New passcodes do not match.');
      return;
    }

    onChangePasscode(newPass);
    setSuccessMsg('Admin passcode updated successfully!');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isAdmin ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
              {isAdmin ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {isAdmin ? 'Admin Dashboard Settings' : 'Admin Access Verification'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAdmin ? 'Owner permissions active' : 'Portfolio edit lock'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher if logged in */}
        {isAdmin && (
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Session Status
            </button>
            <button
              onClick={() => setActiveTab('change_password')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'change_password' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Change Passcode
            </button>
          </div>
        )}

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode 1: Login Form */}
        {!isAdmin && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-slate-300 text-xs leading-relaxed">
              <strong>🔒 Protected Portfolio:</strong> General visitors have view-only access. Enter your admin passcode to enable editing, update profile details, and upload new profile photos.
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                Unlock Admin Mode
              </button>
            </div>
          </form>
        )}

        {/* Mode 2: Already Logged In */}
        {isAdmin && activeTab === 'login' && (
          <div className="space-y-4 text-center py-2">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
              <p className="font-bold text-sm">Authenticated as Admin / Portfolio Owner</p>
              <p className="text-slate-400">You now have full editing controls across all portfolio sections, including profile photo uploads and customizers.</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Lock & Exit Admin Mode
              </button>
            </div>
          </div>
        )}

        {/* Mode 3: Change Passcode Form */}
        {isAdmin && activeTab === 'change_password' && (
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                New Passcode
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new passcode"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm New Passcode
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-enter new passcode"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Update Passcode
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
