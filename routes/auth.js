const express = require('express');
const router = express.Router();

// import Middleware
const { protectRoute } = require('../middleware/protectRoutes');

// Import Controllers
const {
	register,
	login,
	logout,
	getAuthUser,
	forgotPassword,
	resetPasswordViaToken,
	updateDetails,
	updatePassword,
} = require('../controllers/auth');

// Use Auth Controllers
router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/user').get(protectRoute, getAuthUser).put(protectRoute, updateDetails);

router.route('/user/change_password').put(protectRoute, updatePassword);

router.route('/forgot_password').post(forgotPassword);

router.route('/reset_password/:reset_token').put(resetPasswordViaToken);

module.exports = router;
