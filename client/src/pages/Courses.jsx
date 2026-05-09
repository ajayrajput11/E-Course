import React, { useEffect, useState } from "react";
import { getAllCoursesApi } from "../api/api";
import CourseCard from "../components/CourseCard";
import { BookOpen } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await getAllCoursesApi();

        if (res?.data?.courses) {
          setCourses(res.data.courses);
        }
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex items-center gap-3 text-gray-300 text-lg animate-pulse">
          <BookOpen className="animate-bounce" />
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900/30 via-black to-purple-900/30" />

      <div className="max-w-7xl mx-auto px-5 py-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Available Courses
          </h1>
          <p className="text-gray-400 mt-3">
            Learn new skills and upgrade your career
          </p>
        </div>

        {/* No Courses */}
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-400 mt-32">
            <BookOpen size={48} className="mb-4 opacity-60" />
            <p>No courses available right now.</p>
          </div>
        ) : (
          /* Courses Grid */
          <div
            className="grid gap-8 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3"
          >
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
