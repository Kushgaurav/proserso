import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost, updatePostStatus } from '../services/blogService';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...posts];
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => {
        if (filterStatus === 'published') return !post.draft;
        if (filterStatus === 'draft') return post.draft;
        if (filterStatus === 'featured') return post.featured;
        return true;
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Special handling for dates
        if (sortConfig.key === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredPosts(filtered);
  }, [posts, searchTerm, filterStatus, sortConfig]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.posts || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load blog posts');
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPosts(filteredPosts.map(post => post._id));
      setShowBulkActions(true);
    } else {
      setSelectedPosts([]);
      setShowBulkActions(false);
    }
  };

  const handleSelectPost = (e, postId) => {
    if (e.target.checked) {
      setSelectedPosts([...selectedPosts, postId]);
      setShowBulkActions(true);
    } else {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
      if (selectedPosts.length === 1) {
        setShowBulkActions(false);
      }
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedPosts.length === 0) return;
    
    try {
      if (action === 'delete') {
        if (!window.confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
          return;
        }
        
        for (const postId of selectedPosts) {
          await deletePost(postId);
        }
        
        setPosts(posts.filter(post => !selectedPosts.includes(post._id)));
      } else if (action === 'feature' || action === 'unfeature' || action === 'publish' || action === 'draft') {
        const updates = {
          featured: action === 'feature' ? true : (action === 'unfeature' ? false : undefined),
          draft: action === 'draft' ? true : (action === 'publish' ? false : undefined)
        };
        
        for (const postId of selectedPosts) {
          await updatePostStatus(postId, updates);
        }
        
        // Refresh posts after bulk update
        fetchPosts();
      }
      
      // Clear selections after action
      setSelectedPosts([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      setError(`Failed to ${action} posts`);
    }
  };

  const handleViewPost = (postId) => {
    const post = posts.find(p => p._id === postId);
    if (post) {
      // Open post in a new tab
      window.open(`/blog/${post.slug || postId}`, '_blank');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-content">
      <div className="section-header">
        <h2>Blog Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/blog/new')}
        >
          <FaPlus /> New Post
        </button>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search posts by title, summary, or tags..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select 
            value={filterStatus} 
            onChange={handleFilterChange}
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      {showBulkActions && (
        <div className="bulk-actions">
          <span><strong>{selectedPosts.length}</strong> posts selected</span>
          <div className="bulk-action-buttons">
            <button onClick={() => handleBulkAction('publish')} className="btn btn-sm btn-success">Publish</button>
            <button onClick={() => handleBulkAction('draft')} className="btn btn-sm btn-secondary">Save as Draft</button>
            <button onClick={() => handleBulkAction('feature')} className="btn btn-sm btn-primary">Feature</button>
            <button onClick={() => handleBulkAction('unfeature')} className="btn btn-sm btn-outline">Unfeature</button>
            <button onClick={() => handleBulkAction('delete')} className="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                />
              </th>
              <th className="sortable" onClick={() => handleSort('title')}>
                Title {getSortIcon('title')}
              </th>
              <th className="sortable" onClick={() => handleSort('createdAt')}>
                Created {getSortIcon('createdAt')}
              </th>
              <th>Tags</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  No blog posts found matching your criteria
                </td>
              </tr>
            ) : (
              filteredPosts.map(post => (
                <tr key={post._id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedPosts.includes(post._id)}
                      onChange={(e) => handleSelectPost(e, post._id)}
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{post.tags?.join(', ')}</td>
                  <td>
                    <div className="status-indicators">
                      {post.draft ? (
                        <span className="status draft">Draft</span>
                      ) : (
                        <span className="status published">Published</span>
                      )}
                      {post.featured && <span className="status featured">Featured</span>}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleViewPost(post._id)}
                        title="View post"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => navigate(`/admin/blog/edit/${post._id}`)}
                        title="Edit post"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post._id)}
                        title="Delete post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;