import React from "react";

const About = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center px-6 py-20">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-12">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          About CourseHub
        </h1>

        {/* Intro */}
        <p className="text-gray-200 text-lg leading-relaxed mb-6">
          Welcome to <span className="text-cyan-400 font-semibold">CourseHub</span> —
          a modern course selling platform built to deliver
          <span className="text-purple-400 font-semibold"> high-quality, affordable </span>
          and <span className="text-cyan-400 font-semibold">accessible education</span>
          for students, developers, and professionals.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Whether you're learning a new skill or upgrading your technical abilities,
          our platform is designed to support your journey with
          industry-relevant content and expert-guided learning.
        </p>

        {/* Mission Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            🎯 Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to bring expert-level industry knowledge directly to your
            fingertips. Every course is carefully designed and maintained by
            certified instructors with real-world experience.
          </p>
        </div>

        {/* Offerings */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-5">
            🚀 What We Offer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "High-quality video lectures",
              "Lifetime course access",
              "Verified completion certificates",
              "Learn anytime, anywhere",
              "Affordable pricing & secure payments",
              "Industry-relevant curriculum",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
              >
                <span className="text-cyan-400 text-xl">✔</span>
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <p className="text-gray-300 text-lg leading-relaxed">
          Thank you for choosing <span className="text-purple-400 font-semibold">CourseHub</span>.
          Let’s start learning, building, and growing — together 🚀
        </p>
      </div>
    </div>
  );
};

export default About;
