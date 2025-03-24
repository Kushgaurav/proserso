const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Helper function to clean up old logo files
const cleanupOldLogos = async (currentLogoPath) => {
  try {
    const uploadsDir = 'public/uploads/site';
    const files = await fs.readdir(uploadsDir);
    
    for (const file of files) {
      if (file.startsWith('logo-') && path.join(uploadsDir, file) !== currentLogoPath) {
        await fs.unlink(path.join(uploadsDir, file));
      }
    }
  } catch (error) {
    console.error('Error cleaning up old logos:', error);
    // Don't throw error here, as this is a cleanup operation
  }
};

// Update site logo
exports.updateLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No logo file provided'
      });
    }

    // Clean up old logo files
    await cleanupOldLogos(req.file.path);

    return res.status(200).json({
      success: true,
      message: 'Logo updated successfully',
      data: {
        filename: req.file.filename,
        path: `/uploads/site/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });

  } catch (error) {
    console.error('Error in logo update:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing logo update'
    });
  }
};

exports.getLogo = async (req, res) => {
  try {
    const settingsPath = path.join(__dirname, '../../public/uploads/site/settings.json');
    
    // Try to read the settings file
    try {
      const settingsData = await fs.readFile(settingsPath, 'utf8');
      const settings = JSON.parse(settingsData);
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      // If file doesn't exist or is invalid, return default settings
      res.json({
        success: true,
        data: {
          logo: '/uploads/site/default-logo.png',
          updatedAt: null
        }
      });
    }
  } catch (error) {
    console.error('Error getting logo:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving logo settings'
    });
  }
};