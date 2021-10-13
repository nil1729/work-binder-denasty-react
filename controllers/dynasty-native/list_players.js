const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const DEFAULT_LIMIT = Number(process.env.PAGE_LIMIT);
const DEFAULT_PAGE = Number(process.env.PAGE_START);
const { google } = require('googleapis');
const uuid = require('uuid');

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

exports.getAllPlayers = asyncHandler(async (req, res, next) => {
	if (!req.GOOGLE_OAUTH_CREDENTIALS)
		throw new ErrorResponse(`Error while retrieving data from source`, 500);
	const sheets = google.sheets({ version: 'v4', auth: req.GOOGLE_OAUTH_CREDENTIALS });

	const resp = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: `PPR!A2:F301`,
	});

	if (resp.data.values) {
		const playerList = [];
		resp.data.values.forEach((player) => {
			playerList.push({
				name: player[1],
				player_id: uuid.v4(),
			});
		});

		const part_one = playerList.sort(() => Math.random() - 0.5);
		const part_two = playerList.sort(() => Math.random() - 0.5);
		const part_three = playerList.sort(() => Math.random() - 0.5);
		const whole_question = part_one.concat(part_two, part_three);

		return res.status(200).json({
			metadata: {
				total_questions: whole_question.length / 6,
				total_players: whole_question.length / 3,
			},
			data: whole_question,
		});
	} else throw new ErrorResponse(`No players found`, 404);
});

exports.publishRankedList = asyncHandler(async (req, res, next) => {
	if (!req.GOOGLE_OAUTH_CREDENTIALS)
		throw new ErrorResponse(`Error while retrieving data from source`, 500);
	const sheets = google.sheets({ version: 'v4', auth: req.GOOGLE_OAUTH_CREDENTIALS });

	const data = req.body;
	if (_.isArray(data) && data.length === 150) {
		const groupedData = groupBy(data);
		const firstPart = data.slice(0, data.length / 3);
		let rankedPlayersList = [];

		firstPart.forEach((player) => {
			let totalRank = 0;
			groupedData
				.get(player.player_id)
				.forEach((it) => (totalRank += Number(it.rank || randomIntFromInterval(1, 6))));
			rankedPlayersList.push({
				rank: totalRank,
				name: player.name,
				player_id: player.player_id,
			});
		});

		let sortedList = rankedPlayersList.sort(sortBasedOnRank);
		let sheetValues = sortedList.map((player, index) => {
			return [index, player.name];
		});

		await sheets.spreadsheets.values.update({
			spreadsheetId: process.env.SPREADSHEET_ID,
			range: `RANKINGS!A2:B`,
			valueInputOption: 'RAW',
			resource: {
				values: sheetValues,
			},
		});
		return res.status(200).json({
			message: 'Ranked list published successfully',
		});
	} else throw new ErrorResponse(`Invalid data`, 400);
});

function sortBasedOnRank(a, b) {
	if (Number(a.rank) < Number(b.rank)) return -1;
	if (Number(a.rank) > Number(b.rank)) return 1;
	return 0;
}

function groupBy(list) {
	const map = new Map();
	list.forEach((item) => {
		const key = item.player_id;
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
