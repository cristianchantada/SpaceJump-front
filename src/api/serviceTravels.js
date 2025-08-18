import client from './client';

export function getTravels() {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_URL;
	return client.get(travels_URL);
}

export function getTravel(id) {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_URL;
	return client.get(`${travels_URL}/${id}`);
}

export function postTravel(data) {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.post(travels_URL, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export function deleteTravel(id) {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.delete(`${travels_URL}/${id}`);
}

export function getLocations() {
	const locations_URL = process.env.REACT_APP_API_LOCATIONS_URL;
	return client.get(locations_URL);
}

export function editTravel(id, data) {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.put(`${travels_URL}/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export function buyTravel(id, userBuyer) {
	const buy_URL = process.env.REACT_APP_API_TRAVELS_BUY_URL;
	return client.put(`${buy_URL}/${id}`, { userBuyer });
}

export function deletePhoto(photoName) {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.delete(`${travels_URL}/deletePhoto/${photoName}`);
}

export const getTravelUser = (user, headers) => {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.post(`${travels_URL}/users`, user, headers);
};

export const getTravelFavorite = (user, headers) => {
	const favorites_URL = process.env.REACT_APP_API_FAVORITES_URL;
	return client.post(favorites_URL, user, headers);
};

export const closeOpenTravel = (id, travelActive) => {
	const travels_URL = process.env.REACT_APP_API_TRAVELS_P_URL;
	return client.put(`${travels_URL}/active/${id}`, { travelActive });
};

export const setTravelFavorite = (user, headers) => {
	const favorites_URL = process.env.REACT_APP_API_FAVORITES_URL;
	client.post(`${favorites_URL}/setForFavorite`, user, headers);
};

export const getTravelBuy = (user, headers) => {
	const buy_URL = process.env.REACT_APP_API_BUY_URL;
	return client.post(buy_URL, user, headers);
};

export const getSendEmail = email => {
	return client.post('/sendEmail', email);
};
