import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import CourseDetails from "./pages/CourseDetails";


// NEW SINGLE REGISTER PAGE
import Register from "./pages/Register";

import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AdminDashboard from "./pages/admin/AdminDashboard";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <div className="min-h-screen bg-black">
          <Routes>

            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/course/:id" element={<CourseDetails />} />

            {/* Unified Register Page */}
            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />


            {/* Protected for normal users */}
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  <h1 className="text-center mt-10 text-xl font-bold">
                    My Purchased Courses (Add Page Later)
                  </h1>
                </ProtectedRoute>
              }
            />

            {/* Admin protected pages */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/add-course"
              element={
                <AdminProtectedRoute>
                  <AddCourse />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/edit-course/:id"
              element={
                <AdminProtectedRoute>
                  <EditCourse />
                </AdminProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
