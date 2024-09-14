import axios from 'axios';

const lunchtymeAPIBaseURL = 'https://api.lunchtyme.store/';
const baseHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
};

const APIHelper = {
	makeSecureAPICall(accessToken) {
		if (!accessToken) {
			throw new Error("Access token is required to make secure http requests")
		}
		return axios.create({
			baseURL: lunchtymeAPIBaseURL,
			headers: { ...baseHeaders, "Authorization": `Bearer ${accessToken}` }
		});
	},
	makeAPICall: axios.create({
		baseURL: lunchtymeAPIBaseURL,
		headers: baseHeaders,
	}),
};

export default APIHelper;