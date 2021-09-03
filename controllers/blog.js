const Blog = require('../models/Blog');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendingMail');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const DEFAULT_LIMIT = Number(process.env.PAGE_LIMIT);
const DEFAULT_PAGE = Number(process.env.PAGE_START);
const { isValidObjectId } = require('mongoose');
const { ObjectId } = require('mongodb');

exports.createBlog = asyncHandler(async (req, res, next) => {
	const { title, body, coverPhoto } = req.body;

	if (!title || !body) {
		req.error = new ErrorResponse('Please provide title and body', 400);
		next();
	}

	let blogObj = {
		title,
		body,
		coverPhoto,
		user: req.user.id,
	};
	blogObj.slug = await Blog.createSlugString(title);

	const blog = await Blog.create(blogObj);
	return res.status(201).json({
		success: true,
		message: 'Blog created successfully',
		data: blog,
	});
});

exports.getAllBlogs = asyncHandler(async (req, res, next) => {
	const { limit, page, sort, order, search } = req.query;

	let queryArr = [
		{
			$match: { _id: { $exists: true } },
		},
		{
			$lookup: {
				from: 'users',
				let: { userId: '$user' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [{ $eq: ['$_id', '$$userId'] }],
							},
						},
					},
					{
						$project: {
							name: 1,
						},
					},
				],
				as: 'author_detail',
			},
		},
		{
			$project: {
				title: 1,
				preview: { $concat: [{ $substr: ['$body', 0, 250] }, '......'] },
				previewId: '$slug',
				coverPhotoURL: '$coverPhoto.publicURL',
				id: '$_id',
				_id: 0,
				author_detail: {
					$cond: {
						if: { $isArray: '$author_detail' },
						then: { $first: '$author_detail' },
						else: 'NA',
					},
				},
			},
		},
		{
			$sort: { updatedAt: -1 },
		},
	];

	// Pagination
	let requestedPage = Number(page);
	let requestedLimit = Number(limit);

	requestedPage = _.isInteger(requestedPage) && requestedPage > 1 ? requestedPage : DEFAULT_PAGE;
	requestedLimit =
		_.isInteger(requestedLimit) && (requestedLimit > 0 || requestedLimit <= 25)
			? requestedLimit
			: DEFAULT_LIMIT;

	queryArr.push(
		{
			$facet: {
				metadata: [
					{ $count: 'totalBlogs' },
					{
						$addFields: {
							page: requestedPage,
							limit: requestedLimit,
							totalPages: { $ceil: { $divide: ['$totalBlogs', requestedLimit] } },
						},
					},
				],
				data: [{ $skip: (requestedPage - 1) * requestedLimit }, { $limit: requestedLimit }], // add projection here wish you re-shape the docs
			},
		},
		{
			$project: {
				metadata: {
					$cond: {
						if: { $gt: [{ $size: '$metadata' }, Number(0)] },
						then: { $first: '$metadata' },
						else: {
							totalBlogs: 0,
							page: requestedPage,
							limit: requestedLimit,
							totalPages: 0,
						},
					},
				},
				data: 1,
			},
		}
	);

	let output = await Blog.aggregate(queryArr);
	return res.status(200).json(output[0]);
});

exports.getBlogById = asyncHandler(async (req, res, next) => {
	const { previewId } = req.params;

	const blog = await Blog.findOne({ slug: previewId }).populate({
		path: 'user',
		select: 'name email',
	});
	if (!blog) throw new ErrorResponse(`Requested Blog post not found`, 404);

	return res.status(200).json({
		success: true,
		data: blog,
	});
});
