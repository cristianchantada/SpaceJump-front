import storage from './storage';

function ReturnUser() {
	let jsonweb = {};

	const fetchData = () => {
		const accessToken = storage.get('auth');

		if (accessToken !== null) {
			const base64Url = accessToken.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload = decodeURIComponent(
				window
					.atob(base64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);
			jsonweb = JSON.parse(jsonPayload);
		}
	};

	fetchData();

	return jsonweb;
}

export default ReturnUser;
