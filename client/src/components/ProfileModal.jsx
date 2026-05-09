import React from "react";
import { X, User, Mail, Shield, Calendar } from "lucide-react";

const ProfileModal = ({ open, onClose, user }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-900 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-4 border-blue-500 shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
          </div>
        </div>

        <h2 className="text-center text-white text-2xl font-extrabold mt-4">
          Profile Details
        </h2>

        {/* Info */}
        <div className="mt-6 space-y-4 text-gray-300 text-sm">

          <div className="flex items-center gap-3">
            <User size={18} className="text-blue-400" />
            <span className="font-medium">Name:</span>
            <span className="ml-auto text-white">{user?.name || "—"}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} className="text-blue-400" />
            <span className="font-medium">Email:</span>
            <span className="ml-auto text-white">{user?.email || "—"}</span>
          </div>

          <div className="flex items-center gap-3">
            <Shield size={18} className="text-blue-400" />
            <span className="font-medium">Role:</span>
            <span className="ml-auto text-white capitalize">
              {user?.role || "—"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-400" />
            <span className="font-medium">Joined:</span>
            <span className="ml-auto text-white">
              {user?.createdAt
                ? new Date(user.createdAt).toDateString()
                : "—"}
            </span>
          </div>

        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-400 text-black font-semibold py-3 rounded-xl transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
