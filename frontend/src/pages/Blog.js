import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getPosts } from '../services/blogService';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'latest'
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const observer = useRef();

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts({ category: filters.category, sortBy: filters.sortBy });
        setPosts(prevPosts => page === 1 ? response.posts : [...prevPosts, ...response.posts]);
        setHasMore(response.hasMore);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, filters]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setPage(1);
    updateActiveFilters(type, value);
  };

  const updateActiveFilters = (type, value) => {
    if (value === 'all') {
      setActiveFilters(prev => prev.filter(f => f.type !== type));
    } else {
      setActiveFilters(prev => {
        const filtered = prev.filter(f => f.type !== type);
        return [...filtered, { type, value }];
      });
    }
  };

  const removeFilter = (type) => {
    handleFilterChange(type, 'all');
  };

  const SkeletonPost = () => (
    <div className="blog-card skeleton">
      <div className="skeleton-image"></div>
      <div className="blog-card-content">
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      <PageHeader 
        title="Our Blog" 
        subtitle="Stay updated with the latest insights, news, and industry trends"
        backgroundImage="/images/blog-header.jpg"
      />
      
      <section className="blog-content-section">
        <div className="container">
          <div className="blog-filters">
            <div className="blog-filter-options">
              <select 
                className="category-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="development">Development</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
              <select 
                className="sort-select"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            {activeFilters.length > 0 && (
              <div className="active-filters">
                {activeFilters.map(filter => (
                  <div 
                    key={filter.type} 
                    className="active-filter"
                    onClick={() => removeFilter(filter.type)}
                  >
                    <span>{filter.type}:</span> {filter.value}
                    <span className="remove-filter">×</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="blog-layout">
            <div className="posts-grid">
              {loading && page === 1 ? (
                Array(6).fill().map((_, index) => <SkeletonPost key={index} />)
              ) : (
                posts.map((post, index) => (
                  <div 
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                    key={post.id} 
                    className={`blog-card ${post.featured ? 'featured' : ''}`}
                  >
                    <div className="blog-card-image">
                      <img src={post.image} alt={post.title} />
                      <span className="blog-category">{post.category}</span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-meta">
                        <span className="blog-date">{post.date}</span>
                      </div>
                      <h2 className="blog-title">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h2>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <a href={`/blog/${post.slug}`} className="read-more">
                        Read More <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <aside className="blog-sidebar">
              <div className="sidebar-widget trending-posts">
                <h3>Trending Posts</h3>
                {/* Trending posts content */}
              </div>
              <div className="sidebar-widget categories">
                <h3>Categories</h3>
                {/* Categories content */}
              </div>
              <div className="sidebar-widget newsletter">
                <h3>Subscribe to Our Newsletter</h3>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </aside>
          </div>

          {loading && page > 1 && (
            <div className="loading-more">
              <LoadingSpinner />
              <span>Loading more posts...</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;