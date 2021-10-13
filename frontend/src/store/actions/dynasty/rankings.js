import { ADD_ALERTS } from '../../types';

import sendRequest, { setAuthToken } from '../../utils/axios-setup';

const getRankings = (rankingType, page, limit) => async (dispatch) => {
	try {
		const res = await sendRequest.get(
			`/dynasty/rankings/${rankingType}?page=${page}&limit=${limit}`
		);
		return res.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};
const getAllPlayers = () => async (dispatch) => {
	try {
		const res = await sendRequest.get(`/dynasty/list_players/get_players/all`);
		return res.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};
const publishRankings = (playerList) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/dynasty/list_players/publish/rankings`, playerList);
		dispatch({
			type: ADD_ALERTS,
			payload: res.data.message,
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export { getRankings, getAllPlayers, publishRankings };
