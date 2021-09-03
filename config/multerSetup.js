// Multer Setup
const multer = require('multer');
const randomString = require('randomstring');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const fs = require('fs');

// Check Extension Name
const checkFileRequirement = asyncHandler(async (req, file, cb) => {
	const extn = path.extname(file.originalname);
	const type = new RegExp(process.env.DOCUMENT_TYPE);
	if (!type.test(extn)) {
		throw new ErrorResponse('Please upload a document with jpg or png or pdf only', 400);
	}
	cb(null, file);
});

// Storage Setup
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let dest =
			process.env.NODE_ENV !== 'production'
				? path.join(__dirname, '..', 'tmp')
				: path.join('../tmp');
		cb(null, dest);
	},
	filename: function (req, file, cb) {
		cb(null, `${randomString.generate(40)}${path.extname(file.originalname)}`);
	},
});

// Upload Setup
module.exports = multer({
	storage: storage,
	limits: { fileSize: process.env.DOCUMENT_SIZE_LIMIT },
	fileFilter: checkFileRequirement,
}).single('cover-photo');
