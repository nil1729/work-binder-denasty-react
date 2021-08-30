const express = require('express');
const router = express.Router();

// import Middleware
const { protectRoute } = require('../middleware/protectRoutes');

// Import Controllers
const {
	register,
	login,
	logout,
	getProfile,
	forgotPassword,
	resetPasswordViaToken,
	updateDetails,
	updatePassword,
} = require('../controllers/auth');

// Use Auth Controllers
router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/profile').get(protectRoute, getProfile).put(protectRoute, updateDetails);

router.route('/profile/change_password').put(protectRoute, updatePassword);

router.route('/forgot_password').post(forgotPassword);

router.route('/reset_password/:reset_token').put(resetPasswordViaToken);

module.exports = router;
