import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/favorites");
      const data = response.data;
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch favorites error:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-center px-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Please login to view your favorites</h2>
          <Link
            to="/login"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-10">
      <motion.h1
        className="relative w-full text-4xl sm:text-5xl font-extrabold text-center leading-[1.2] tracking-tight 
             mb-10 px-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
             overflow-visible break-words mt-6 sm:mt-10 select-none"
        style={{WebkitTextStroke: "0.3px transparent",paddingBottom:"6px",}}

        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} >
        My Favorites
      </motion.h1>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 animate-pulse">Loading favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <motion.div
          className="text-center py-20 px-6 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mt-7">💖</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Favorite Projects Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven’t added any favorites yet. Explore and find something that inspires you!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Browse Projects
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {favorites.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} user={user} onLike={fetchFavorites} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Favorites;
