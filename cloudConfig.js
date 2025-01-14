const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Corrected typo
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Multer-Storage-Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'instastay_DEV', 
    allowed_formats: ['png', 'jpg', 'jpeg'], 
  },
});

// Export Cloudinary and storage for reuse
module.exports = {
  cloudinary,
  storage,
};
