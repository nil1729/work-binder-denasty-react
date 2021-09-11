import {} from '../../types';

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

export { getRankings };
