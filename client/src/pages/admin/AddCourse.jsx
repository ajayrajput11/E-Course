import { useState, useContext } from "react";
import { addCourseApi } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookOpen, Image, IndianRupee, FileText, Plus, X } from "lucide-react";

const AddCourse = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await addCourseApi(formData, token);

      if (res.data.success) {
        navigate("/admin/dashboard");
      } else {
        setError(res.message || "Something went wrong");
      }
    } catch (error) {
      setError("Server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-xl bg-slate-900 border border-gray-700 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Add New Course
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm">Course Title</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="React Mastery"
                className="w-full pl-10 pr-3 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Complete React course from beginner to advanced"
                className="w-full pl-10 pr-3 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-gray-300 text-sm">Price</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="499"
                className="w-full pl-10 pr-3 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-gray-300 text-sm">Image URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://image-link.com/course.png"
                className="w-full pl-10 pr-3 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-black font-semibold py-3 rounded-xl transition"
            >
              <Plus size={18} />
              {loading ? "Adding..." : "Add Course"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
            >
              <X size={18} />
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCourse;
