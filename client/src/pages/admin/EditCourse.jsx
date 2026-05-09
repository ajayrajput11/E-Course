import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  updateCourseApi,
  getAdminSingleCourseApi,
} from "../../api/api";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getAdminSingleCourseApi(id);

        if (!res.data.success) {
          alert("Course not found or not allowed!");
          return navigate("/admin/dashboard");
        }

        setFormData({
          title: res.data.course.title,
          description: res.data.course.description,
          price: res.data.course.price,
          imageUrl: res.data.course.imageUrl,
        });
      } catch (err) {
        console.log(err);
        alert("Failed to load course!");
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await updateCourseApi(id, formData);

      if (res.data.success) {
        alert("Course Updated Successfully!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 flex justify-center">
      <div className="w-full max-w-xl">

        {/* Card */}
        <div className="bg-slate-900 border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Edit Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Course Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-black font-semibold py-3 rounded-xl transition"
              >
                {loading ? "Updating..." : "Update Course"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
