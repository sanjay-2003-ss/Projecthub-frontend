import { useState, useEffect } from "react";
import api from "../utils/api";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

function Home({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");


  useEffect(() => {
    fetchProjects();
  }, [page, selectedTag]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (selectedTag) params.tag = selectedTag;

      const response = await api.get("/projects", { params });
      setProjects(Array.isArray(response.data.projects) ? response.data.projects : []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Fetch projects error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.07),transparent_40%),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.07),transparent_40%)]"></div>

      {/* Hero Section */}
      <motion.div
        className="text-center mb-12 mt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-gray-500 text-sm sm:text-base tracking-widest uppercase mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Explore | Build | Inspire
        </motion.p>

        <h1
          className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight 
                     bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none"
          style={{ WebkitTextStroke: "0.3px transparent", paddingBottom: "6px" }}>
          Discover Amazing Projects
        </h1>

        {/* Animated underline */}
        <motion.div
          className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-full mt-4"
          initial={{ width: 0 }}
          animate={{ width: "10rem" }}
          transition={{ delay: 0.4, duration: 0.8 }}/>
        </motion.div>

      {/* Search & Filters */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }} >
          
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 mb-6 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm border border-gray-200"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-2 sm:mt-0"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setSelectedTag("");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !selectedTag
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {["React","JavaScript" ,"Node.js", "MongoDB", "Express"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 animate-pulse">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No projects found</p>
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <ProjectCard project={project} user={user} onLike={fetchProjects} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-md disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Previous
              </button>
              <span className="text-gray-700 text-sm sm:text-base">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-md disabled:opacity-50 hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Home;
