import { createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './layout/reportWebVitals';
import { setAuthorizationHeader } from './api/client';
import storage from './layout/utils/storage';
import ReactDOM from 'react-dom/client';
import configureStore from './redux';
import './css/custom-styles.css';
import Root from './Root';
import React from 'react';
import App from './App';

const accessToken = storage.get('auth');
if (accessToken) {
	setAuthorizationHeader(accessToken); //leemos al inicir o refrescar la pagina si hay token o no en el local storage
}
const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
	},
]);
const store = configureStore({ auth: { isLogged: !!accessToken } }, { router }); //creamos el store y ya disponemos de dispatch, getState...
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Root
			store={store}
			router={router}
		/>
	</React.StrictMode>
);

reportWebVitals();
