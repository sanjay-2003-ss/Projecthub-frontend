import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../utils/api';

function ProjectCard({ project, onLike, user }) {
  const [likes, setLikes] = useState(project.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    user && project.likes?.includes(user._id)
  );

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to like projects');
      return;
    }

    try {
      const response = await api.post(`/projects/${project._id}/like`);
      setLikes(response.data.likes);
      setIsLiked(!isLiked);
      if (onLike) onLike();
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  return (
    <Link to={`/projects/${project._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
            {project.title}
          </h3>
          <button
            onClick={handleLike}
            className={`px-3 py-1 rounded ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {likes}
          </button>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.author?.photoURL && (
              <img
                src={project.author.photoURL}
                alt={project.authorName}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">
              {project.authorName || project.author?.displayName}
            </span>
          </div>

          {project.averageRating > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm font-semibold">
                {project.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}


export default ProjectCard;