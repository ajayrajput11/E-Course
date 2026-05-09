import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, token } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/api/admin/course/${id}`);
        setCourse(data.course);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleBuy = async () => {
    if (!token) return navigate("/user/login");

    try {
      const { data } = await api.post("/api/users/purchasecourse", {
        courseId: course._id,
      });
      alert(data.message);
    } catch {
      alert("Purchase failed!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Course Not Found!
      </div>
    );

  return (
    
    <div className="min-h-screen bg-black text-white px-4 pt-24 pb-12">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          ← Back to Courses
        </button>

        <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-56 sm:h-72 md:h-96 object-cover"
          />
        </div>

        {/* ✅ Content Card */}
        <div className="bg-slate-900 border border-gray-700 rounded-2xl p-5 sm:p-8">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {course.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Price */}
            <div>
              <p className="text-sm text-gray-400 uppercase">Price</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                ₹ {course.price}
              </p>
            </div>

            {/* CTA */}
            {role === "admin" ? (
              <button
                onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Edit Course
              </button>
            ) : (
              <button
                onClick={handleBuy}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-400 transition"
              >
                Buy Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
