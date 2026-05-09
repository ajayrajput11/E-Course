import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-5">

        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[#0b0b0b] 
          bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)]
          bg-[size:20px_20px]" />

        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Hero Content */}
        <div className="relative max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Learn New Skills <br />
            <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              Boost Your Career
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore high-quality online courses taught by industry experts.
            Learn at your own pace — anytime, anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to={role === "admin" ? "/admin/add-course" : "/courses"}
              className="px-8 py-3 rounded-lg font-semibold 
              bg-gradient-to-r from-sky-400 to-blue-500 
              text-black hover:scale-105 transition-transform"
            >
              {role === "admin" ? "Add Course" : "Browse Courses"}
            </Link>

            {!token && !role && (
              <>
                <Link
                  to="/login"
                  className="px-8 py-3 rounded-lg font-semibold 
                  border border-gray-700 bg-gray-900 
                  hover:bg-gray-800 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-8 py-3 rounded-lg font-semibold 
                  border border-gray-700 bg-gray-900 
                  hover:bg-gray-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
          Why Choose Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Expert Instructors",
              desc: "Learn from industry professionals with real-world experience.",
              color: "from-pink-400 to-purple-500",
            },
            {
              title: "Lifetime Access",
              desc: "Unlimited access to all courses anytime, anywhere.",
              color: "from-sky-400 to-blue-500",
            },
            {
              title: "Affordable Pricing",
              desc: "Premium learning at prices students can afford.",
              color: "from-emerald-400 to-green-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative group rounded-xl border border-white/10 
              bg-gradient-to-b from-white/5 to-transparent 
              p-6 text-center hover:-translate-y-2 transition"
            >
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 
                blur-xl bg-gradient-to-r ${item.color}`}
              />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative py-20 text-center bg-gradient-to-r from-slate-900 to-black">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Start Learning Today 🚀
        </h2>
        <p className="mt-3 text-gray-300">
          Join thousands of learners and upgrade your skills.
        </p>

        <Link
          to={role === "admin" ? "/admin/add-course" : "/courses"}
          className="inline-block mt-8 px-10 py-4 rounded-xl font-semibold 
          bg-gradient-to-r from-sky-400 to-purple-500 
          text-black hover:scale-105 transition-transform"
        >
          {role === "admin" ? "Add Course" : "Explore Courses"}
        </Link>
      </section>
    </div>
  );
};

export default Home;
