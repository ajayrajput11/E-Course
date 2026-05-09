import React from "react";
import { X, LogOut } from "lucide-react";

const LogoutModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gradient-to-br from-slate-900 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 relative">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500/20 text-red-400">
            <LogOut size={28} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-white text-xl font-bold mb-2">
          Confirm Logout
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Are you sure you want to log out of your account?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-black font-semibold hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
