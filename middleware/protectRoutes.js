const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');

// import Models
const User = require('../models/User');
const Blog = require('../models/Blog');

exports.protectRoute = asyncHandler(async (req, res, next) => {
	let token;
	// Check request headers has a "authorization" key
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		// Set token from request headers
		token = req.headers.authorization.split(' ')[1]; // Bearer tokenXXX
	} else if (req.cookies.TOKEN) {
		// Set token form cookie
		token = req.cookies.TOKEN;
	}

	// check token exists or not
	if (!token) {
		throw new ErrorResponse(`You are not authorized to access this resource`, 401);
	}

	// Remove Random String from token
	const keyPattern = new RegExp(`(${process.env.JWT_RANDOM_STRING})`, 'g');
	token = token.replace(keyPattern, '.');

	// Decode and Verify the token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

	// Find user from decoded payload
	const user = await User.findById(decodedToken.id);

	if (!user) {
		throw new ErrorResponse(
			`Oops! No user found. Maybe your account disabled or permanently deleted.`,
			403
		);
	}

	// set user object to the request
	req.user = user;

	next();
});

exports.authorizeBlogOps = asyncHandler(async (req, res, next) => {
	const { blogId } = req.params;
	const { user } = req;

	// Find blog by id
	const blog = await Blog.findById(blogId);

	if (!blog) {
		throw new ErrorResponse(`Blog with id ${blogId} not found`, 404);
	}

	if (blog.user.toString() !== user._id.toString()) {
		throw new ErrorResponse(`You are not authorized to access this resource`, 401);
	}

	next();
});
