const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendingMail');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
/*
@desc   User Register
@route  POST /api/v1/auth/register
@access Public 
*/
exports.register = asyncHandler(async (req, res, next) => {
	let { name, username, email, password } = req.body;

	let userExistsWithEmail = await User.findOne({ email });
	let userExistsWithUsername = await User.findOne({ username });

	if (userExistsWithEmail || userExistsWithUsername)
		throw new ErrorResponse(`User with ${email || username} already exists`, 400);

	const user = await User.create({
		name,
		email,
		username,
		password,
	});

	sendTokenResponseWithCookie(user, 200, res);
});

/*
@desc   User Login
@route  POST /api/v1/auth/login
@access Public 
*/
exports.login = asyncHandler(async (req, res, next) => {
	let { username, email, password } = req.body;

	// Validate User Inputs
	if (!username && !email) {
		throw new ErrorResponse('Please provide an username or email', 400);
	}
	if (!password) {
		throw new ErrorResponse('Please provide a password', 400);
	}

	let query, findBy;

	// Check for User
	if (email) {
		query = User.findOne({ email: email });
		findBy = 'email';
	} else if (username) {
		query = User.findOne({ username: username });
		findBy = 'username';
	}

	const user = await query.select('+password');

	if (!user) {
		throw new ErrorResponse(
			`The ${findBy} and password you entered did not match our records.`,
			401
		);
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		throw new ErrorResponse(
			`The ${findBy} and password you entered did not match our records.`,
			401
		);
	}

	sendTokenResponseWithCookie(user, 200, res);
});

/*
@desc   Get Logged in User Information
@route  POST /api/v1/auth/user
@access Private 
*/
exports.getAuthUser = asyncHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
		data: req.user,
	});
});

/*
@desc   Logout a User
@route  GET /api/v1/auth/logout
@access Private 
*/
exports.logout = asyncHandler(async (req, res, next) => {
	// Set Options for Cookie
	const cookieOptions = {
		maxAge: 10,
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true;
	}
	res.status(200).cookie('TOKEN', null, cookieOptions).json({
		success: true,
		data: req.user,
	});
});

/*
@desc   Update User Details (mail, name, username)
@route  PUT /api/v1/auth/profile
@access Private 
*/
exports.updateDetails = asyncHandler(async (req, res, next) => {
	const updateDetails = { ...req.body };
	const allowedParams = ['name', 'email'];

	Object.keys(req.body).forEach((it) => {
		if (!allowedParams.includes(it)) delete updateDetails[it];
	});

	let user = await User.findByIdAndUpdate(req.user._id, updateDetails, {
		new: true,
		runValidators: true,
	});

	if (req.body.username) {
		user.username = req.body.username;
		await user.save();
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

/*
@desc   Change Password for authenticated user
@route  PUT /api/v1/auth/profile/changepassword
@access Private
*/
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword) {
		throw new ErrorResponse('Please provide all required fields properly', 400);
	}

	let user = await User.findById(req.user._id).select('+password');

	const isMatch = await user.matchPassword(oldPassword);

	if (!isMatch) {
		throw new ErrorResponse(`Wrong Credentials. Make sure you entered the correct password`, 401);
	}

	user.password = newPassword;

	await user.save();

	sendTokenResponseWithCookie(user, 200, res);
});

/*
@desc   Send an email to the specified user
@route  POST /api/v1/auth/forgot_password
@access Public 
*/
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	let { username, email } = req.body;

	// Validate User Inputs
	if (!username && !email) {
		throw new ErrorResponse('Please provide an username or email', 400);
	}

	let query, findByMethod;

	// Check for User
	if (email) {
		query = User.findOne({ email: email });
		findByMethod = 'email address';
	} else if (username) {
		query = User.findOne({ username: username });
		findByMethod = 'username';
	}
	const user = await query;
	if (!user) {
		throw new ErrorResponse(
			`The ${findByMethod} you entered did not match any of our records`,
			403
		);
	}

	let resetPasswordToken = user.generateResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	// Mail Options
	const options = setupForgotPasswordEmailTemplate(user, resetPasswordToken);
	let msg;

	// Sending Mail to User
	if (process.env.NODE_ENV === 'production') {
		await sendEmail(options);
		msg = 'Reset Password link sent to your email address.';
		resetPasswordToken = undefined;
	}

	res.status(200).json({
		success: true,
		message: msg,
		resetPasswordToken,
	});
});

/*
@desc   Send an email to the specified user
@route  PUT /api/v1/auth/reset_password/:reset_token
@access Public
*/
exports.resetPasswordViaToken = asyncHandler(async (req, res, next) => {
	let { reset_token } = req.params;
	const { password } = req.body;

	if (!password) {
		throw new ErrorResponse('Please provide a password', 400);
	}

	let user = await User.validateResetPasswordRequest(reset_token);

	if (!user) {
		throw new ErrorResponse('Oops! May be your reset password session expired', 403);
	}

	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(200).json({
		success: true,
		message: 'Your Password has been reset. Please login to continue',
	});
});

const setupForgotPasswordEmailTemplate = (user, token) => {
	const templateHTML = fs.readFileSync(
		path.join(__dirname, '../utils/email_template.html'),
		'utf8'
	);
	const mainHTML = ejs.render(templateHTML, {
		userName: user.name,
		resetToken: token,
	});

	// Mail Options
	const options = {
		mail: user.email,
		subject: 'Reset Password Request',
		mainBody: mainHTML,
	};

	return options;
};

// Send Token with Cookie
const sendTokenResponseWithCookie = async (user, statusCode, res) => {
	// Create Token
	const token = await user.getJWTSignatureToken();

	// Set Options for Cookie
	const cookieOptions = {
		maxAge: process.env.JWT_COOKIE_MAX_AGE,
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true;
	}

	res
		.status(statusCode)
		.cookie('TOKEN', token, cookieOptions)
		.json({
			success: true,
			responses: {
				accessToken: token,
				user: { username: user.username, name: user.name, email: user.email, userId: user._id },
			},
		});
};
