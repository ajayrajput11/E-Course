import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">

      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

      {/* Course Image */}
      <div className="overflow-hidden">
        <img
          src={course.imageUrl || "https://via.placeholder.com/400"}
          alt={course.title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="relative p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {course.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Price + CTA */}
        <div className="mt-5 flex items-center justify-between">
          <span className="px-4 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-black">
            ₹ {course.price}
          </span>

          <Link
            to={`/course/${course._id}`}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white hover:text-black transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
