import axios from 'axios';

const client = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(response => response.data);

export const setAuthorizationHeader = token => {
	client.defaults.headers.common['Authorization'] = `${token}`; //pone el token por defecto en la cabecera
};

export const removeAuthorizationHeader = () => {
	delete client.defaults.headers.common['Authorization']; //con esto borramos el token del header cuando hacemos el logout
};
export default client;
