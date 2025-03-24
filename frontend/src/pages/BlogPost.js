import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/blogService';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!articleRef.current) return;
    
    const element = articleRef.current;
    const totalHeight = element.clientHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    
    if (totalHeight - windowHeight > 0) {
      const progress = (scrollTop / (totalHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  }, [articleRef]);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPost(id);
      setPost(data);
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPost, handleScroll]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Implement comment submission functionality
      // For now, just add to local state
      const newCommentObj = {
        _id: Date.now().toString(),
        content: newComment,
        author: { fullName: 'Current User' },
        createdAt: new Date().toISOString()
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="blog-post-page">
      <PageHeader 
        title={post.title}
        subtitle={post.summary}
        backgroundImage={post.image || '/images/blog-header.jpg'}
      />
      
      <div className="blog-post-content">
        <div className="container">
          <article className="post-content" ref={articleRef}>
            <div className="post-meta">
              <span className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="post-author">
                By {post.author?.fullName || 'Anonymous'}
              </span>
            </div>

            <div 
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags?.length > 0 && (
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          <div className="post-sidebar">
            <aside className="sidebar-content">
              <div className="reading-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${readingProgress}%` }}
                />
                <span>{Math.round(readingProgress)}% read</span>
              </div>

              <div className="share-buttons">
                <h3>Share this post</h3>
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
              </div>

              <div className="post-comments">
                <h3>Comments ({comments.length})</h3>
                
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    required
                    aria-label="Comment text"
                  />
                  <button type="submit">Post Comment</button>
                </form>

                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment._id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">
                          {comment.author?.fullName || 'Anonymous'}
                        </span>
                        <span className="comment-date">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="comment-content">
                        {comment.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget related-posts">
                <h3>Related Posts</h3>
                <div className="related-posts-list">
                  {/* Related posts will be implemented later */}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;