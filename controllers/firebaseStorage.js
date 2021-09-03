const firebaseAdmin = require('../config/firebase-admin');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const storageBucket = firebaseAdmin.storage().bucket();
const path = require('path');
const fs = require('fs');

exports.uploadFile = asyncHandler(async (req, res, next) => {
	if (!req.file) throw new ErrorResponse(`No file was uploaded`, 400);

	const uploadOptions = {
		destination: `BLOG_COVER_PHOTOS/${req.file.filename}`,
		uploadType: 'media',
		metadata: {
			metadata: {
				contentType: req.file.mimetype,
				uploadedBy: req.user.name,
			},
		},
	};

	await storageBucket.upload(req.file.path, uploadOptions);
	const publicURL = await storageBucket.file(uploadOptions.destination).getSignedUrl({
		action: 'read',
		expires: '03-09-2491',
	});

	req.body.coverPhoto = { publicURL: publicURL[0], fileId: uploadOptions.destination };
	fs.unlinkSync(req.file.path);
	next();
});

exports.removeFile = asyncHandler(async (req, res, next) => {
	if (req.error && req.error.constructor && req.error.constructor.name === 'ErrorResponse') {
		storageBucket.file(req.body.coverPhoto.fileId).delete();
		throw req.error;
	}
});
