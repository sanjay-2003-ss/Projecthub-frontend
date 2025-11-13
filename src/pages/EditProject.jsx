import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import toast, { Toaster } from 'react-hot-toast'; 

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubLink: '',
    liveLink: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

 
  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      const project = response.data;
      setFormData({
        title: project.title || '',
        description: project.description || '',
        tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
        githubLink: project.githubLink || '',
        liveLink: project.liveLink || ''
      });
    } catch (error) {
      console.error('Fetch project error:', error);
      setError('Failed to load project');
      toast.error('Failed to load project details ❌');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await api.put(`/projects/${id}`, {
        ...formData,
        tags
      });

      toast.success('✅ Project updated successfully!');
      setTimeout(() => {
        navigate(`/projects/${id}`);
      }, 1000);
    } catch (error) {
      console.error('Update project error:', error);
      const msg = error.response?.data?.error || 'Failed to update project';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              maxLength="100"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
              maxLength="2000"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* GitHub Link */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">GitHub Link *</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Live Demo Link */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Live Demo Link (Optional)
            </label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
