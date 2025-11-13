import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });

      await api.post("/users/profile", {
        displayName,
        photoURL: "",
        bio: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-8 sm:p-10 transition-transform transform hover:scale-[1.02] hover:shadow-xl">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
              <FaUserPlus className="text-white text-2xl" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            Join us and start building your projects today 🚀
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-50 text-red-700 text-sm border border-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all hover:border-purple-400"
                placeholder="At least 6 characters"
                required
                minLength="6"
              />
            </div>

            <motion.button
              whileHover={{ scale: !loading ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline hover:text-purple-600"
            >
              Login
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} ProjectHub. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
