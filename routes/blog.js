const express = require('express');
const router = express.Router();
const multerUpload = require('../config/multerSetup');

// import Middleware
const { protectRoute } = require('../middleware/protectRoutes');

// Import Controllers

const { createBlog, getAllBlogs } = require('../controllers/blog');
const { uploadFile, removeFile } = require('../controllers/firebaseStorage');

router
	.route('/')
	.post(protectRoute, multerUpload, uploadFile, createBlog, removeFile)
	.get(getAllBlogs);

module.exports = router;
