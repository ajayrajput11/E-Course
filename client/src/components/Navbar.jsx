import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModel";
import ProfileModal from "./ProfileModal";

import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BookOpenIcon,
  InformationCircleIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            CourseHub
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 items-center font-medium text-white/90">
            <li>
              <Link className="hover:text-cyan-400 transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-cyan-400 transition" to="/courses">
                Courses
              </Link>
            </li>
            <li>
              <Link className="hover:text-cyan-400 transition" to="/about">
                About
              </Link>
            </li>

            {role === "admin" && (
              <li>
                <Link
                  className="hover:text-cyan-400 transition"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {token && (
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="profile"
                  onClick={() => setShowProfile(true)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-500 hover:scale-105 transition"
                />
              </li>
            )}

            {!token ? (
              <>
                <li>
                  <Link className="hover:text-cyan-400 transition" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-9 h-9" />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="w-8 h-8 text-gray-300" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-6 text-white">
          <Link to="/" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
            <HomeIcon className="w-6 h-6" /> Home
          </Link>

          <Link to="/courses" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
            <BookOpenIcon className="w-6 h-6" /> Courses
          </Link>

          <Link to="/about" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
            <InformationCircleIcon className="w-6 h-6" /> About
          </Link>

          {role === "admin" && (
            <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
              <Squares2X2Icon className="w-6 h-6" /> Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
                <UserCircleIcon className="w-6 h-6" /> Login
              </Link>
              <Link to="/register" onClick={() => setSidebarOpen(false)} className="flex gap-3 hover:text-cyan-400">
                <UserCircleIcon className="w-6 h-6" /> Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setSidebarOpen(false);
                setShowLogoutModal(true);
              }}
              className="flex items-center gap-3 bg-red-600 py-2 rounded-lg hover:bg-red-700"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* MODALS */}
      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
      />
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navbar;
