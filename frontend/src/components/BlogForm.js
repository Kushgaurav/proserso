import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPost, getCategories } from '../services/blogService';
import { Editor } from '@tinymce/tinymce-react';
import { FaSave, FaTimes, FaCog, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/BlogForm.css';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: null,
    tags: [],
    featured: false,
    draft: true,
    category: '',
    // SEO metadata
    metaTitle: '',
    metaDescription: '',
    slug: '',
    // Scheduled publishing
    publishDate: '',
    // Additional fields
    author: '',
    readTime: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [seoSettingsOpen, setSeoSettingsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Use useCallback to prevent the function from being recreated on every render
  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPost(id);
      const formattedPublishDate = data.publishDate ? new Date(data.publishDate).toISOString().slice(0, 16) : '';
      
      setFormData({
        title: data.title,
        summary: data.summary,
        content: data.content,
        tags: data.tags || [],
        featured: data.featured,
        draft: data.draft,
        category: data.category || '',
        metaTitle: data.metaTitle || data.title || '',
        metaDescription: data.metaDescription || data.summary || '',
        slug: data.slug || '',
        publishDate: formattedPublishDate,
        author: data.author || '',
        readTime: data.readTime || ''
      });
      
      if (data.image) {
        setPreviewImage(data.image);
      }
      
      // Generate preview URL
      if (data.slug) {
        setPreviewUrl(`/blog/${data.slug}`);
      }
    } catch (err) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
    
    // Fetch categories
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Use default categories if API fails
        setCategories([
          'Technology', 
          'Business', 
          'Architecture', 
          'Infrastructure', 
          'Human Resources', 
          'Event Management',
          'Digital Transformation'
        ]);
      }
    };
    
    loadCategories();
  }, [id, fetchPost]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      
      // Create preview URL for image
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Auto-generate slug from title
      if (name === 'title' && !formData.slug) {
        const slug = value.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        setFormData(prev => ({
          ...prev,
          slug
        }));
      }
      
      // Auto-populate meta title if empty
      if (name === 'title' && !formData.metaTitle) {
        setFormData(prev => ({
          ...prev,
          metaTitle: value
        }));
      }
      
      // Auto-populate meta description if empty
      if (name === 'summary' && !formData.metaDescription) {
        setFormData(prev => ({
          ...prev,
          metaDescription: value
        }));
      }
    }
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
    
    // Calculate estimated read time based on content length
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assume average reading speed of 200 words per minute
    
    setFormData(prev => ({
      ...prev,
      readTime: readTime.toString()
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.summary || !formData.content) {
        throw new Error('Title, summary, and content are required fields');
      }
      
      // Validate meta description length for SEO
      if (formData.metaDescription && formData.metaDescription.length > 160) {
        throw new Error('Meta description should be less than 160 characters for optimal SEO');
      }
      
      // Check if publish date is in the past when not a draft
      if (!formData.draft && formData.publishDate) {
        const publishDate = new Date(formData.publishDate);
        const now = new Date();
        
        if (publishDate < now) {
          formData.draft = false; // Publish immediately if date is in the past
        } else {
          formData.draft = true; // Keep as draft if scheduled for future
        }
      }
      
      if (id) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error.message || 'Failed to save blog post');
      setLoading(false);
    }
  };

  const generatePreviewUrl = () => {
    if (formData.slug) {
      setPreviewUrl(`/blog/${formData.slug}`);
    } else if (formData.title) {
      const slug = formData.title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setPreviewUrl(`/blog/${slug}`);
    }
  };

  const handlePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  if (loading && id) return (
    <div className="blog-form-container">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="mt-3">Loading post data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="blog-form-container">
      <div className="error-message">
        <strong>Error: </strong>{error}
      </div>
      <button 
        className="btn btn-primary mt-3"
        onClick={() => navigate('/admin/blog')}
      >
        Return to Blog List
      </button>
    </div>
  );

  return (
    <div className="blog-form-container fade-in">
      <div className="section-header">
        <h2>{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="header-actions">
          {previewUrl && (
            <button
              type="button"
              className="btn btn-outline mr-2"
              onClick={handlePreview}
            >
              Preview
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter post title"
            />
          </div>
          
          <div className="form-group col-md-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary *</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
            placeholder="Enter post summary"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
            value={formData.content}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Featured Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="Enter tags, separated by commas"
          />
        </div>
        
        {/* Advanced settings section */}
        <div className="settings-section">
          <div 
            className="settings-header" 
            onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
          >
            <FaCog />
            <h3>Advanced Settings</h3>
            {advancedSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {advancedSettingsOpen && (
            <div className="settings-content">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                  />
                </div>
                
                <div className="form-group col-md-6">
                  <label htmlFor="readTime">Read Time (minutes)</label>
                  <input
                    type="number"
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="Estimated read time"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="publishDate">Schedule Publication</label>
                <input
                  type="datetime-local"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                />
                <small className="form-text text-muted">
                  Leave empty for immediate publication (when not a draft)
                </small>
              </div>
              
              <div className="form-group checkbox-group">
                <div>
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured">Featured Post</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="draft"
                    name="draft"
                    checked={formData.draft}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="draft">Save as Draft</label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* SEO metadata section */}
        <div className="settings-section">
          <div 
            className="settings-header" 
            onClick={() => setSeoSettingsOpen(!seoSettingsOpen)}
          >
            <FaCog />
            <h3>SEO Settings</h3>
            {seoSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {seoSettingsOpen && (
            <div className="settings-content">
              <div className="form-group">
                <label htmlFor="slug">URL Slug</label>
                <div className="input-with-action">
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="Enter URL slug"
                  />
                  <button 
                    type="button" 
                    className="btn btn-sm btn-secondary"
                    onClick={generatePreviewUrl}
                  >
                    Generate preview URL
                  </button>
                </div>
                <small className="form-text text-muted">
                  The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                </small>
              </div>
              
              <div className="form-group">
                <label htmlFor="metaTitle">Meta Title</label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="Enter meta title for SEO"
                />
                <small className="form-text text-muted">
                  Recommended length: 50-60 characters
                </small>
              </div>
              
              <div className="form-group">
                <label htmlFor="metaDescription">Meta Description</label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  placeholder="Enter meta description for SEO"
                  rows="2"
                />
                <small className="form-text text-muted">
                  Recommended length: 150-160 characters
                </small>
                <div className="character-count">
                  {formData.metaDescription.length}/160 characters
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/blog')}
            disabled={loading}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div> Saving...
              </>
            ) : (
              <>
                <FaSave /> Save Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
