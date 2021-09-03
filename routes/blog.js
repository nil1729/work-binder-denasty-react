const express = require('express');
const router = express.Router();
const multerUpload = require('../config/multerSetup');

// import Middleware
const { protectRoute } = require('../middleware/protectRoutes');

// Import Controllers

const { createBlog, getAllBlogs, getBlogById } = require('../controllers/blog');
const { uploadFile, removeFile } = require('../controllers/firebaseStorage');

router
	.route('/')
	.post(protectRoute, multerUpload, uploadFile, createBlog, removeFile)
	.get(getAllBlogs);

router.route('/:previewId').get(getBlogById);
module.exports = router;
