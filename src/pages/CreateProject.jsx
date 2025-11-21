import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";

function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    githubLink: "",
    liveLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const response = await api.post("/projects", {
        title: formData.title,
        description: formData.description,
        tags,
        githubLink: formData.githubLink,
        liveLink: formData.liveLink || undefined,
      });

      console.log("Project created:", response.data);

      setFormData({
        title: "",
        description: "",
        tags: "",
        githubLink: "",
        liveLink: "",
      });

      navigate("/my-projects");
    } catch (error) {
      console.error("Create project error:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create New Project
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              maxLength="100"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="6"
              required
              maxLength="2000"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-all hover:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate tags with commas
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              GitHub Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Live Demo Link (Optional)
            </label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              placeholder="https://myproject.com"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all hover:border-purple-400"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: !loading ? 1.03 : 1 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl"
            }`}
          >
            {loading ? "Creating..." : "Create Project"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateProject;
