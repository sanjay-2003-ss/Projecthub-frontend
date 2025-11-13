import { useState, useEffect } from 'react';
import api from '../utils/api';

function CommentSection({ projectId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (projectId) fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/project/${projectId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Fetch comments error:', err);
      setError('Failed to load comments.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setError('');
    setLoading(true);

    // Optimistic UI update
    const tempComment = {
      _id: Date.now(),
      text: newComment,
      authorName: user.displayName,
      author: { _id: user._id, photoURL: user.photoURL },
      createdAt: new Date().toISOString(),
    };

    setComments([tempComment, ...comments]);
    setNewComment('');

    try {
      await api.post('/comments', { text: newComment, projectId });
      fetchComments();
    } catch (err) {
      console.error('Post comment error:', err);
      setError('Failed to post comment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error('Delete comment error:', err);
      setError('Failed to delete comment.');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-5">Comments</h3>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows="3"
            maxLength="1000"
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-6">Login to leave a comment</p>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-50 border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {comment.author?.photoURL && (
                    <img
                      src={comment.author.photoURL}
                      alt={comment.authorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{comment.authorName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {user && user._id === comment.author?._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
