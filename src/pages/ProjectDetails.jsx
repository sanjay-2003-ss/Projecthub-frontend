import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import CommentSection from '../components/CommentSection';
import StarRating from '../components/StarRating';

function ProjectDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchProject();
    if (user) checkFavorite();
  }, [id, user]);

  const fetchProject = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/projects/${id}`);
      const data = response.data;
      setProject(data);

      if (user && data.ratings) {
        const found = data.ratings.find(
          (r) => r.user?._id?.toString() === user._id?.toString()
        );
        if (found) setUserRating(found.value);
      }

    } catch (err) {
      console.error('Fetch project error:', err);
      setError('Failed to load project details.');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await api.get('/users/favorites');
      setIsFavorite(response.data.some((p) => p._id === id));
    } catch (err) {
      console.error('Check favorite error:', err);
    }
  };

  const handleFavorite = async () => {
    if (!user) return alert('Please login to favorite projects');

    try {
      await api.post(`/users/favorites/${id}`);
      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error('Toggle favorite error:', err);
    }
  };

  const handleRate = async (rating) => {
    if (!user) {
      alert('Please login to rate projects');
      return;
    }

    try {
      const response = await api.post(`/projects/${id}/rate`, { rating });
      setUserRating(rating);
      setProject((prev) => ({
        ...prev,
        averageRating: response.data.averageRating || prev.averageRating,
      }));
      setTimeout(fetchProject, 300);
    } catch (error) {
      console.error('Rate project error:', error);
    }};

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?'))
     return;

    try {
      await api.delete(`/projects/${id}`);
      navigate('/my-projects');
    } catch (err) {
      console.error('Delete project error:', err);
      alert('Failed to delete project');
    }};

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600 animate-pulse">Loading project...</p>
      </div>
    );
  }

    const isOwner = user && project.author._id === user._id;

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-600">{error || 'Project not found'}</p>
      </div>
    );}


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 transition-all">
       
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
          <div className="flex gap-2">
            {user && (
              <button
                onClick={handleFavorite}
                className={`px-4 py-2 rounded font-medium ${isFavorite
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                {isFavorite ? '★ Favorited' : '☆ Favorite'}
              </button>
            )}
            {isOwner && (
              <>
                <Link
                  to={`/edit/${id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {project.author?.photoURL && (
            <img
              src={project.author.photoURL}
              alt={project.author.displayName}
              className="w-12 h-12 rounded-full object-cover"/>
          )}
          <div>
            <p className="font-semibold">{project.author.displayName}</p>
            <p className="text-sm text-gray-500">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Links</h2>
          <div className="space-y-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline">
              🔗 GitHub Repository
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline">
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <div className="flex items-center gap-4">
            <StarRating
              initialRating={userRating}
              onRate={handleRate}
              readOnly={!user}
            />
            <span className="text-gray-600">
              {project.averageRating > 0
                ? `Average: ${project.averageRating.toFixed(1)} / 5`
                : 'No ratings yet'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            ❤️ {project.likes?.length || 0} likes
          </p>
        </div>

        <CommentSection projectId={id} user={user} />
      </div>
    </div>
  );
}

export default ProjectDetail;
