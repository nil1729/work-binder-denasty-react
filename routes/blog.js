const express = require('express');
const router = express.Router();
const multerUpload = require('../config/multerSetup');

// import Middleware
const { protectRoute } = require('../middleware/protectRoutes');

// Import Controllers

const { createBlog, getAllBlogs, getBlogById, getBlogsByAuthor } = require('../controllers/blog');
const { uploadFile, removeFile } = require('../controllers/firebaseStorage');

router
	.route('/')
	.post(protectRoute, multerUpload, uploadFile, createBlog, removeFile)
	.get(getAllBlogs);

router.route('/:previewId').get(getBlogById);
router.route('/my/author_only').get(protectRoute, getBlogsByAuthor);

module.exports = router;
