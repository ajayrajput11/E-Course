import { useState } from "react";
import { registerAdminApi, registerUserApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loggedUser, setLoggedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setErrorMsg("Please choose a role");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      let res;
      if (role === "admin") {
        res = await registerAdminApi({ name, email, password });
      } else {
        res = await registerUserApi({ name, email, password });
      }

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);

        setLoggedUser(res.data.user);
        setShowProfile(true);

        setTimeout(() => {
          navigate(role === "admin" ? "/admin/dashboard" : "/courses");
        }, 1500);
      } else {
        setErrorMsg(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />

      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

        <h2 className="text-3xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm text-center mt-2">
          Join CourseHub & start learning today
        </p>

        {errorMsg && (
          <p className="mt-4 text-center text-sm text-red-500">
            {errorMsg}
          </p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" className="bg-black">Select Role</option>
              <option value="admin" className="bg-black">Admin</option>
              <option value="user" className="bg-black">User</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-cyan-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={loggedUser}
      />
    </div>
  );
};

export default Register;
