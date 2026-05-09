import { useEffect, useState, useContext } from "react";
import { getAllCoursesApi, deleteCourseApi } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Plus } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteCourseApi(deleteId, token);

      if (res.data.success) {
        fetchCourses();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error deleting course");
      console.log(err);
    }

    setShowModal(false);
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getAllCoursesApi(token);

      if (res.data.courses) {
        setCourses(res.data.courses);
      } else {
        setError("Failed to load courses");
      }
    } catch (err) {
      setError("Server error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  },[]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold">
            Admin Dashboard
          </h1>

          <button
            onClick={() => navigate("/admin/add-course")}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-black font-semibold px-5 py-2 rounded-xl transition"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-400">Loading courses...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold mb-1">
                  {course.title}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-3">
                  {course.description}
                </p>

                <p className="text-blue-400 font-semibold mt-3">
                  ₹ {course.price}
                </p>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-course/${course._id}`)
                    }
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => openDeleteModal(course._id)}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && !loading && (
          <p className="text-center text-gray-400 mt-10">
            No courses found. Add a new one.
          </p>
        )}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-gray-700 rounded-2xl p-6 w-80 text-white">
            <h2 className="text-xl font-bold mb-3">
              Delete Course
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
