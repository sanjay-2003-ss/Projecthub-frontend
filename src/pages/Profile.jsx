import { useState, useEffect } from "react";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/me");
      setProfile(response.data);
      setFormData({
        displayName: response.data.displayName,
        bio: response.data.bio || "",
      });
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users/profile", formData);
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-xl font-medium text-gray-700">
          Please login to view your profile
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-xl font-medium text-gray-700 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <FaUserCircle className="text-6xl text-blue-600 mb-3" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile.displayName || "Unnamed User"}
          </h1>
          <p className="text-gray-600">{profile.email}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

        {/* Edit or View Mode */}
        {editing ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all hover:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-all hover:border-purple-400"
              />
            </div>

            <div className="flex gap-4 justify-center sm:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    displayName: profile.displayName,
                    bio: profile.bio || "",
                  });
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.bio || "No bio added yet"}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Member Since
              </h2>
              <p className="text-gray-700">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-center sm:text-right">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Profile;
