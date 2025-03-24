import React, { useState, useEffect } from 'react';
import { updateLogo, updateHeroSection, updateSocialLinks, getLogo } from '../services/settingsService';
import { FaUpload, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const AdminSettings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [heroSettings, setHeroSettings] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    backgroundImage: ''
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  });

  useEffect(() => {
    // Fetch existing settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Fetch logo
      try {
        const logoData = await getLogo();
        if (logoData && logoData.url) {
          setCurrentLogo(logoData.url);
        }
      } catch (logoError) {
        console.error('Error fetching logo:', logoError);
        // Don't set error state here to avoid blocking other settings
      }

      // Implement fetching settings from backend
      // For now using placeholder data
      setHeroSettings({
        title: 'Professional Services for Your Success',
        subtitle: 'IT Consulting, Architecture & Design, Business Transformation',
        buttonText: 'Explore Services',
        buttonLink: '/services',
        backgroundImage: '/images/hero-bg.jpg'
      });

      setSocialLinks({
        facebook: 'https://facebook.com/proserso',
        twitter: 'https://twitter.com/proserso',
        linkedin: 'https://linkedin.com/company/proserso',
        instagram: 'https://instagram.com/proserso'
      });
    } catch (error) {
      setError('Failed to load settings');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        setError('Please select a PNG or JPEG file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('logo', selectedFile);
      
      // Use updateLogo instead of uploadLogo
      await updateLogo(formData);
      
      setSuccess('Logo updated successfully');
      setCurrentLogo(previewUrl); // Update the current logo with the preview
      setSelectedFile(null);
      
      // Don't clear the preview URL so the user can see the updated logo
    } catch (error) {
      console.error('Error uploading logo:', error);
      setError(error.message || 'Failed to upload logo');
    } finally {
      setLoading(false);
    }
  };

  const handleHeroUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await updateHeroSection(heroSettings);
      setSuccess('Hero section updated successfully');
    } catch (error) {
      setError(error.message || 'Failed to update hero section');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await updateSocialLinks(socialLinks);
      setSuccess('Social links updated successfully');
    } catch (error) {
      setError(error.message || 'Failed to update social links');
    } finally {
      setLoading(false);
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="admin-content">
      <h2>Site Settings</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Logo Section */}
      <div className="settings-section">
        <h3>Site Logo</h3>
        <p>Upload a new logo for the website. Recommended size: 200x50px. PNG or JPEG format only.</p>

        <div className="logo-upload-section">
          {/* Show current logo if available */}
          {currentLogo && !previewUrl && (
            <div className="logo-preview">
              <h4>Current Logo</h4>
              <img src={currentLogo} alt="Current logo" />
            </div>
          )}
          
          {/* Show preview if available */}
          {previewUrl && (
            <div className="logo-preview">
              <h4>New Logo Preview</h4>
              <img src={previewUrl} alt="Logo preview" />
            </div>
          )}

          <div className="upload-controls">
            <input
              type="file"
              id="logo-upload"
              accept="image/png,image/jpeg"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <label htmlFor="logo-upload" className="btn btn-outline">
              <FaUpload /> Select File
            </label>
            {selectedFile && (
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span> Uploading...
                  </>
                ) : (
                  'Upload Logo'
                )}
              </button>
            )}
            {previewUrl && !selectedFile && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section Settings */}
      <div className="settings-section">
        <h3>Hero Section</h3>
        <form onSubmit={handleHeroUpdate}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={heroSettings.title}
              onChange={(e) => setHeroSettings({...heroSettings, title: e.target.value})}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              value={heroSettings.subtitle}
              onChange={(e) => setHeroSettings({...heroSettings, subtitle: e.target.value})}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Button Text</label>
            <input
              type="text"
              value={heroSettings.buttonText}
              onChange={(e) => setHeroSettings({...heroSettings, buttonText: e.target.value})}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Button Link</label>
            <input
              type="text"
              value={heroSettings.buttonLink}
              onChange={(e) => setHeroSettings({...heroSettings, buttonLink: e.target.value})}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Background Image URL</label>
            <input
              type="text"
              value={heroSettings.backgroundImage}
              onChange={(e) => setHeroSettings({...heroSettings, backgroundImage: e.target.value})}
              className="form-control"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span> Updating...
                </>
              ) : (
                'Update Hero Section'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Social Links Settings */}
      <div className="settings-section">
        <h3>Social Media Links</h3>
        <form onSubmit={handleSocialUpdate}>
          <div className="form-group">
            <label><FaFacebook /> Facebook</label>
            <input
              type="url"
              value={socialLinks.facebook}
              onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
              className="form-control"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div className="form-group">
            <label><FaTwitter /> Twitter</label>
            <input
              type="url"
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
              className="form-control"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn</label>
            <input
              type="url"
              value={socialLinks.linkedin}
              onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
              className="form-control"
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
          <div className="form-group">
            <label><FaInstagram /> Instagram</label>
            <input
              type="url"
              value={socialLinks.instagram}
              onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
              className="form-control"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span> Updating...
                </>
              ) : (
                'Update Social Links'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;