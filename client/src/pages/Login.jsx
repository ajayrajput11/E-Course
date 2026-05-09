import { useState, useContext } from "react";
import { loginAdminApi, loginUserApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";
import { Mail, Lock, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showProfile, setShowProfile] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const handleLogin = async (e) => {
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
        res = await loginAdminApi({ email, password });
      } else {
        res = await loginUserApi({ email, password });
      }

      if (res?.data?.token) {
        const token = res.data.token;
        const userRole = res.data.role;
        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("user", JSON.stringify(user));

        login(token, userRole);

        setLoggedUser(user);
        setShowProfile(true);

        setTimeout(() => {
          navigate(userRole === "admin" ? "/admin/dashboard" : "/courses");
        }, 1200);
      } else {
        setErrorMsg(res?.data?.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900/30 via-black to-purple-900/30" />

      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

        <h2 className="text-3xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm text-center mt-2">
          Login to continue learning
        </p>

        {errorMsg && (
          <p className="mt-4 text-center text-sm text-red-500">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

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
              <option value="" className="bg-black">Login as</option>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-cyan-400 hover:underline"
          >
            Register
          </button>
        </p>
      </div>

      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        user={loggedUser}
      />
    </div>
  );
};

export default Login;
