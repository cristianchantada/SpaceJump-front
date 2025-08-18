import client from './client';

export const getTravelChat = (user, headers) => {
	const chat_URL = process.env.REACT_APP_API_CHAT_URL;
	return client.post(`${chat_URL}/view`, user, headers);
};

export const setTravelChat = (chat, headers) => {
	const chat_URL = process.env.REACT_APP_API_CHAT_URL;
	return client.post(`${chat_URL}/set`, chat, headers);
};

export const setViewChat = (chat, headers) => {
	const chat_URL = process.env.REACT_APP_API_CHAT_URL;
	return client.post(`${chat_URL}/review`, chat, headers);
};

export const setReadChat = (chat, headers) => {
	const chat_URL = process.env.REACT_APP_API_CHAT_URL;
	return client.post(`${chat_URL}/read`, chat, headers);
};
