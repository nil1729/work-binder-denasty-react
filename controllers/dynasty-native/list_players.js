const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const DEFAULT_LIMIT = Number(process.env.PAGE_LIMIT);
const DEFAULT_PAGE = Number(process.env.PAGE_START);
const { google } = require('googleapis');

exports.getPlayerList = asyncHandler(async (req, res, next) => {
	if (!['STANDARD', 'SF-TE-PREMIUM'].includes(req.params.league_format))
		throw new ErrorResponse(`Invalid Ranking type: ${req.params.league_format}`, 400);

	let sheetName = req.params.league_format === 'STANDARD' ? 'PPR' : 'SF-TE-PREMIUM';

	if (!req.GOOGLE_OAUTH_CREDENTIALS)
		throw new ErrorResponse(`Error while retrieving data from source`, 500);
	const sheets = google.sheets({ version: 'v4', auth: req.GOOGLE_OAUTH_CREDENTIALS });

	// Pagination Setup
	let requestedPage = Number(req.query.page);
	let requestedLimit = Number(req.query.limit);

	requestedPage = _.isInteger(requestedPage) && requestedPage > 1 ? requestedPage : DEFAULT_PAGE;
	requestedLimit =
		_.isInteger(requestedLimit) && (requestedLimit > 0 || requestedLimit <= 25)
			? requestedLimit
			: DEFAULT_LIMIT;

	const startIndex = 2 + (requestedPage - 1) * requestedLimit;
	const endIndex = 1 + requestedPage * requestedLimit;

	if (startIndex > 1000 || endIndex > 1000) throw new ErrorResponse(`No players found`, 404);

	const resp = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: `${sheetName}!A${startIndex}:F${endIndex}`,
	});

	if (resp.data.values) {
		const playersRanks = [];
		resp.data.values.forEach((player) => {
			playersRanks.push({
				rank: player[0],
				name: player[1],
				team: player[2],
				position: player[3],
				value: player[4],
			});
		});
		return res.status(200).json(playersRanks);
	} else throw new ErrorResponse(`No players found`, 404);
});
