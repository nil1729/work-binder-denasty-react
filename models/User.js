const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			match: [/^[A-Za-z\s]+$/, 'Only alphabetic characters are allowed'],
			trim: true,
			maxlength: [35, 'Please choose a name which has at most 35 characters'],
		},
		username: {
			type: String,
			required: [true, 'Please add a username'],
			unique: true,
			match: [/^[ A-Za-z0-9_]*$/, 'Only underscores and alphanumeric characters are allowed'],
			trim: true,
			maxlength: [20, 'Please choose a name which has at most 20 characters'],
		},
		email: {
			type: String,
			match: [
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please provide a valid email address',
			],
			unique: true,
			required: [true, 'Please provide a email address'],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			select: false,
			minlength: [6, 'Please add a password which has at least 6 characters'],
		},
		resetPasswordExpire: {
			type: Date,
			select: false,
		},
		resetPasswordToken: {
			type: String,
			select: false,
		},
	},
	{ timestamps: true }
);

// Using mongoose Middleware
UserSchema.pre('save', async function (next) {
	// remove any whitespace characters
	this.username = this.username.replace(/\s/g, '');

	if (!this.isModified('password')) {
		next();
	}

	// Encrypt the Password
	this.password = await bcrypt.hash(this.password, 10);

	next();
});

// Match the Password
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Get JWT Signed token (Using Mongoose Methods)
UserSchema.methods.getJWTSignatureToken = function () {
	return jwt
		.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE_DURATION,
		})
		.replace(/\b([.])\b/g, process.env.JWT_RANDOM_STRING);
};

// Generate Password reset token and return the encrypted token (Using Mongoose Methods)
UserSchema.methods.generateResetPasswordToken = function () {
	// Generate String
	const randomString = crypto.randomBytes(32).toString('hex');

	// Create a Signed JWT Token with some encryption
	const resetToken = jwt
		.sign({ randomString }, process.env.JWT_RESET_PASSWORD_KEY, {
			expiresIn: 600,
		})
		.replace(/\b([.])\b/g, process.env.JWT_RANDOM_STRING);

	// Save hashed token to database
	this.resetPasswordToken = crypto
		.createHash(process.env.PASSWORD_HASH_ALGORITHM)
		.update(randomString)
		.digest('hex');

	// Save Reset Token Duration
	this.resetPasswordExpire = new Date(Date.now() + 600 * 1000);

	return resetToken;
};

// Validate Reset Password Request
UserSchema.statics.validateResetPasswordRequest = async function (resetToken) {
	try {
		// Remove random String from reset token
		const keyPattern = new RegExp(`(${process.env.JWT_RANDOM_STRING})`, 'g');
		const jwtToken = resetToken.replace(keyPattern, '.');

		const decodedToken = jwt.verify(jwtToken, process.env.JWT_RESET_PASSWORD_KEY);

		const { randomString } = decodedToken;

		const resetPasswordToken = crypto
			.createHash(process.env.PASSWORD_HASH_ALGORITHM)
			.update(randomString)
			.digest('hex');

		const user = await this.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: new Date() },
		});

		return user;
	} catch (err) {
		return null;
	}
};

module.exports = mongoose.model('User', UserSchema);
