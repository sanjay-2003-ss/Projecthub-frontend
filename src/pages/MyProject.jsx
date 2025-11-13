import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';

function MyProjects({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyProjects();
    }
  }, [user]);

  const fetchMyProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/projects/user/my-projects');
      const projectData = response.data;
      setProjects(Array.isArray(projectData) ? projectData : []);
    } catch (error) {
      console.error('Fetch my projects error:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Please login to view your projects</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Projects</h1>
        <Link
          to="/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading your projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            You haven't created any projects yet
          </p>
          <Link
            to="/create"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              user={user}
              onLike={fetchMyProjects}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProjects;