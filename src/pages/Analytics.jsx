import { useState, useEffect } from "react";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaChartBar, FaUser, FaProjectDiagram, FaComments } from "react-icons/fa";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.get("/Analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.error("Fetch analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-xl font-medium text-gray-700 animate-pulse">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-xl font-medium text-gray-700">
          Failed to load analytics 😕
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Platform Analytics Dashboard
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">A quick insight into your platform’s performance 🚀 </p>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }} >
          
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all duration-300">
          <FaProjectDiagram className="text-4xl text-blue-600 mb-3" />
          <h3 className="text-gray-600 font-semibold mb-1">Total Projects</h3>
          <p className="text-4xl font-bold text-blue-600">{analytics.totalProjects}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all duration-300">
          <FaUser className="text-4xl text-green-600 mb-3" />
          <h3 className="text-gray-600 font-semibold mb-1">Total Users</h3>
          <p className="text-4xl font-bold text-green-600">{analytics.totalUsers}</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-all duration-300">
          <FaComments className="text-4xl text-purple-600 mb-3" />
          <h3 className="text-gray-600 font-semibold mb-1">Total Comments</h3>
          <p className="text-4xl font-bold text-purple-600">{analytics.totalComments}</p>
        </div>
      </motion.div>

      {/* Most Liked Project */}
      {analytics.mostLikedProject && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartBar className="text-blue-600" /> Most Liked Project
          </h2>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-1">
              {analytics.mostLikedProject.title}
            </h3>
            <p className="text-gray-600 mb-1">
              by <span className="font-medium">{analytics.mostLikedProject.author}</span>
            </p>
            <p className="text-gray-700">❤️ {analytics.mostLikedProject.likes} likes</p>
          </div>
        </motion.div>
      )}

      {/* Top Rated Projects */}
      {analytics.topRatedProjects?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ Top Rated Projects</h2>
          <div className="space-y-4">
            {analytics.topRatedProjects.map((project, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 pb-3 hover:bg-blue-50/60 rounded-lg px-2 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-sm text-gray-600">by {project.author}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                  ⭐ {project.rating.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      {analytics.popularTags?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
            {analytics.popularTags.map((tagData, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-semibold shadow-sm border border-blue-200"
              >
                #{tagData.tag}
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({tagData.count})
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Analytics;
