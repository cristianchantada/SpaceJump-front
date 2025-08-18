import {
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	UI_RESET_ERROR,
	UI_SIGNUP_FAILURE,
	UI_SIGNUP_SUCCESS,
	UI_SIGNUP_REQUEST,
	CREATE_TRAVEL_REQUEST,
	CREATE_TRAVEL_SUCCESS,
	CREATE_TRAVEL_FAILURE,
	AUTH_REMEMBER_PASSWORD_REQUEST,
	AUTH_REMEMBER_PASSWORD_SUCCESS,
	AUTH_REMEMBER_PASSWORD_FAILURE,
	FETCH_LOCATIONS_FAILURE,
	FETCH_LOCATIONS_REQUEST,
	FETCH_LOCATIONS_SUCCESS,
	UI_DELETE_USER_REQUEST,
	UI_DELETE_USER_SUCCESS,
	UI_DELETE_USER_FAILURE,
	DELETE_TRAVEL_FAILURE,
	DELETE_TRAVEL_REQUEST,
	DELETE_TRAVEL_SUCCESS,
	EDIT_TRAVEL_FAILURE,
	EDIT_TRAVEL_REQUEST,
	EDIT_TRAVEL_SUCCESS,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	FETCH_TRAVELS_FAILURE,
	FETCH_TRAVELS_REQUEST,
	FETCH_TRAVELS_SUCCESS,
	DELETE_PHOTO_FAILURE,
	DELETE_PHOTO_REQUEST,
	DELETE_PHOTO_SUCCESS,
	FETCH_SINGLE_TRAVEL_FAILURE,
	FETCH_SINGLE_TRAVEL_REQUEST,
	FETCH_SINGLE_TRAVEL_SUCCESS,
	AUTH_DETAIL_SUCCESS,
	BUY_TRAVEL_FAILURE,
	BUY_TRAVEL_REQUEST,
	BUY_TRAVEL_SUCCESS,
	FILTER_TRAVELS_SUCCESS,
	CLOSE_OPEN_TRAVEL_FAILURE,
	CLOSE_OPEN_TRAVEL_REQUEST,
	CLOSE_OPEN_TRAVEL_SUCCESS,
	UPDATE_FAVORITE_REQUEST,
	UPDATE_FAVORITE_SUCCESS,
	UPDATE_FAVORITE_FAILURE,
} from './types';

import { updateUser, updateUserPassword } from '../api/serviceAuth';
import storage from '../layout/utils/storage';
import { getUserId } from './selectors';

// Travels actions:

export const filterTravelsSuccess = travels => ({
	type: FILTER_TRAVELS_SUCCESS,
	payload: travels,
});

export const fetchTravelsRequest = () => ({
	type: FETCH_TRAVELS_REQUEST,
});

export const fetchTravelsSuccess = travels => ({
	type: FETCH_TRAVELS_SUCCESS,
	payload: travels,
});

export const fetchTravelsFailure = error => ({
	type: FETCH_TRAVELS_FAILURE,
	error: true,
	payload: error,
});

export const fetchTravels = () =>
	async function (dispatch, _getState, { api }) {
		dispatch(fetchTravelsRequest());
		try {
			const travels = await api.travels.getTravels();
			dispatch(fetchTravelsSuccess(travels));
		} catch (error) {
			dispatch(fetchTravelsFailure(error));
		}
	};

export const createTravelRequest = () => ({
	type: CREATE_TRAVEL_REQUEST,
});

export const createTravelSuccess = travel => ({
	type: CREATE_TRAVEL_SUCCESS,
	payload: travel,
});

export const createTravelFailure = error => ({
	type: CREATE_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const createTravel = data =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(createTravelRequest());
		try {
			data.datetimeCreation = Date.now();
			const travel = await api.travels.postTravel(data);
			dispatch(createTravelSuccess(travel));
			router.navigate(`/travel/${travel.topic}/${travel._id}`);
		} catch (error) {
			dispatch(createTravelFailure(error));
		}
	};

export const deleteTravelRequest = () => ({
	type: DELETE_TRAVEL_REQUEST,
});

export const deleteTravelSuccess = id => ({
	type: DELETE_TRAVEL_SUCCESS,
	payload: id,
});

export const deleteTravelFailure = error => ({
	type: DELETE_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const deleteTravel = id =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(deleteTravelRequest());
		try {
			await api.travels.deleteTravel(id);
			dispatch(deleteTravelSuccess(id));
			router.navigate('/travels');
		} catch (error) {
			dispatch(deleteTravelFailure(error));
		}
	};

export const editTravelRequest = () => ({
	type: EDIT_TRAVEL_REQUEST,
});

export const editTravelSuccess = travel => ({
	type: EDIT_TRAVEL_SUCCESS,
	payload: travel,
});

export const editTravelFailure = error => ({
	type: EDIT_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const editTravel = (id, data) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(editTravelRequest());
		try {
			const travel = await api.travels.editTravel(id, data);
			dispatch(editTravelSuccess(travel));
			router.navigate(`/travel/${travel.topic}/${travel._id}`);
		} catch (error) {
			dispatch(editTravelFailure(error));
		}
	};

export const fetchSingleTravelRequest = () => ({
	type: FETCH_SINGLE_TRAVEL_REQUEST,
});

export const fetchSingleTravelSuccess = travel => ({
	type: FETCH_SINGLE_TRAVEL_SUCCESS,
	payload: travel,
});

export const fetchSingleTravelFailure = error => ({
	type: FETCH_SINGLE_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const fetchSingleTravel = id =>
	async function (dispatch, _getState, { api }) {
		dispatch(fetchSingleTravelRequest());
		try {
			const travel = await api.travels.getTravel(id);
			dispatch(fetchSingleTravelSuccess(travel));
		} catch (error) {
			dispatch(fetchSingleTravelFailure(error));
		}
	};

export const buyTravelRequest = () => ({
	type: BUY_TRAVEL_REQUEST,
});

export const buyTravelSuccess = travel => ({
	type: BUY_TRAVEL_SUCCESS,
	payload: travel,
});

export const buyTravelFailure = error => ({
	type: BUY_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const buyTravel = id =>
	async function (dispatch, getState, { api, router }) {
		dispatch(buyTravelRequest());
		try {
			const userBuyer = getUserId(getState());
			const travel = await api.travels.buyTravel(id, userBuyer);
			dispatch(buyTravelSuccess(travel));
			router.navigate('/congratulations');
		} catch (error) {
			dispatch(buyTravelFailure(error));
		}
	};

export const closeOpenTravelRequest = () => ({
	type: CLOSE_OPEN_TRAVEL_REQUEST,
});

export const closeOpenTravelSuccess = travel => ({
	type: CLOSE_OPEN_TRAVEL_SUCCESS,
	payload: travel,
});

export const closeOpenTravelFailure = error => ({
	type: CLOSE_OPEN_TRAVEL_FAILURE,
	error: true,
	payload: error,
});

export const closeOpenTravel = (id, travelActive) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(closeOpenTravelRequest());
		try {
			const travel = await api.travels.closeOpenTravel(id, travelActive);
			dispatch(closeOpenTravelSuccess(travel));
			router.navigate(`/travel/${travel.topic}/${travel._id}`);
		} catch (error) {
			dispatch(closeOpenTravelFailure(error));
		}
	};

// locations actions:

export const fetchLocationsRequest = () => ({
	type: FETCH_LOCATIONS_REQUEST,
});

export const fetchLocationsSuccess = locations => ({
	type: FETCH_LOCATIONS_SUCCESS,
	payload: locations,
});

export const fetchLocationsFailure = error => ({
	type: FETCH_LOCATIONS_FAILURE,
	error: true,
	payload: error,
});

export const fetchLocations = () => {
	return async function (dispatch, _getState, { api }) {
		dispatch(fetchLocationsRequest());
		try {
			const locations = await api.travels.getLocations();
			dispatch(fetchLocationsSuccess(locations));
		} catch (error) {
			dispatch(fetchLocationsFailure(error));
		}
	};
};

// Delete only main travel photo:

export const deletePhotoRequest = () => ({
	type: DELETE_PHOTO_REQUEST,
});

export const deletePhotoSuccess = id => ({
	type: DELETE_PHOTO_SUCCESS,
	payload: id,
});

export const deletePhotoFailure = error => ({
	type: DELETE_PHOTO_FAILURE,
	error: true,
	payload: error,
});

export const deletePhoto = (id, travel) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(deletePhotoRequest(id));
		try {
			await api.travels.deletePhoto(travel.photo);
			dispatch(deletePhotoSuccess(id));
			router.navigate(`/travel-edit/${travel.topic}/${id}`);
		} catch (error) {
			dispatch(deletePhotoFailure(error));
		}
	};

// Auth actions:

export const authLoginRequest = () => ({
	type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = user => ({
	//crea la accion de type authlogin para saber si esta loguedo
	type: AUTH_LOGIN_SUCCESS,
	payload: { userId: user._id, email: user.email, userName: user.userName },
});

export const authSuccess = user => ({
	//crea la accion de type authlogin para saber si esta loguedo
	type: AUTH_DETAIL_SUCCESS,
	payload: { userId: user._id, email: user.email, userName: user.userName },
});

export const authLoginFailure = error => ({
	type: AUTH_LOGIN_FAILURE,
	error: true,
	payload: error,
});

export const authLogout = () => ({
	//crea la accion de type authlogout para saber si no esta loguedo
	type: AUTH_LOGOUT,
});

export const actionLogout = () =>
	function (dispatch, _getState, { api, router }) {
		dispatch(authLogout());
		router.navigate('/login');
	};

export const authlogin = (credential, checked) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(authLoginRequest()); //saber si esta cargando la llamada
		try {
			const user = await api.auth.login(credential, checked);
			dispatch(authLoginSuccess(user));
			const to = router.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
			router.navigate(to);
		} catch (error) {
			dispatch(authLoginFailure(error));
			setTimeout(() => {
				dispatch(resetErrors());
			}, 4000);

			return;
		}
	};

export const authRememberPasswordRequest = () => ({
	type: AUTH_REMEMBER_PASSWORD_REQUEST,
});

export const authRememberPasswordSuccess = userId => ({
	//crea la accion de type authlogin para saber si esta loguedo
	type: AUTH_REMEMBER_PASSWORD_SUCCESS,
});

export const authRememberPasswordFailure = error => ({
	type: AUTH_REMEMBER_PASSWORD_FAILURE,
	error: true,
	payload: error,
});
export const authPassword = credential =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(authRememberPasswordRequest());
		try {
			const password = await api.auth.rememberPassword(credential);
			dispatch(authRememberPasswordSuccess());
			alert(password.msg);
			const to = router.state?.from?.pathname || '/login'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
			router.navigate(to);
		} catch (error) {
			dispatch(authRememberPasswordFailure(error));
			setTimeout(() => {
				dispatch(resetErrors());
			}, 4000);
		}
	};
export const resetErrors = () => ({
	//borramos error
	type: UI_RESET_ERROR,
});

/*Create New User */
export const uiSignUpFailure = error => ({
	type: UI_SIGNUP_FAILURE,
	error: true,
	payload: error,
});

export const uiSignUpSuccess = () => ({
	type: UI_SIGNUP_SUCCESS,
});

export const uiSignUpRequest = () => ({
	type: UI_SIGNUP_REQUEST,
});

export const authSignUp = data =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(uiSignUpRequest());
		if (data.password === data.passwordConfirm) {
			try {
				const newUser = await api.auth.signUp(data, {
					headers: { 'content-type': 'multipart/form-data' },
				});

				if (newUser?.status === 'OK') {
					const credential = {
						email: data.email,
						password: data.password,
					};
					dispatch(uiSignUpSuccess());
					await dispatch(authlogin(credential, true));
				} else {
					dispatch(uiSignUpFailure(newUser?.message));
				}
			} catch (error) {
				dispatch(uiSignUpFailure(error?.message));
			}
		} else {
			dispatch(uiSignUpFailure('password confirmation does not match'));
		}
	};

/*Delete User */

export const uiDeleteUserFailure = error => ({
	type: UI_DELETE_USER_FAILURE,
	error: true,
	payload: error,
});

export const uiDeleteUserSuccess = () => ({
	type: UI_DELETE_USER_SUCCESS,
});

export const uiDeleteUserRequest = () => ({
	type: UI_DELETE_USER_REQUEST,
});

export const authDeleteUser = data =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(uiDeleteUserRequest());
		if (data.password === data.passwordConfirm) {
			try {
				const DeleteUser = await api.auth.deleteUser(data, {
					headers: { 'content-type': 'multipart/form-data' },
				});

				//const DeleteUser = await api.auth.deleteUser(data);

				if (DeleteUser?.status === 'OK') {
					dispatch(uiDeleteUserSuccess());
					storage.remove('auth');

					await dispatch(authLoginFailure(''));
					const to = router.state?.from?.pathname || '/login';
					router.navigate(to);
				} else {
					dispatch(uiDeleteUserFailure(DeleteUser?.message));
				}
			} catch (error) {
				dispatch(uiDeleteUserFailure(error?.message));
			}
		} else {
			dispatch(uiDeleteUserFailure('password confirmation does not match'));
		}
	};

export const authUpdateUserRequest = () => ({
	type: UPDATE_USER_REQUEST,
});

export const authUpdateUserSuccess = update => ({
	//crea la accion de type authlogin para saber si esta loguedo
	type: UPDATE_USER_SUCCESS,
	payload: { userName: update.userName },
});

export const authUpdateUserFailure = error => ({
	type: UPDATE_USER_FAILURE,
	error: true,
	payload: error,
});
export const authUpdateUser = (credential, allUser) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(authUpdateUserRequest());
		if (credential.password === credential.passwordConfirm) {
			try {
				let update = '';
				if (allUser) {
					update = await updateUser(credential);
				} else {
					update = await updateUserPassword(credential);
				}

				dispatch(authUpdateUserSuccess(update));
				alert(update.msg);
				router.navigate('/');
			} catch (error) {
				dispatch(authUpdateUserFailure(error));
				setTimeout(() => {
					dispatch(resetErrors());
				}, 4000);
			}
		} else {
			dispatch(authUpdateUserFailure('Las contraseñas no coinciden'));
			setTimeout(() => {
				dispatch(resetErrors());
			}, 4000);
		}
	};

export const favoriteChange = (checked, travel, travelId, userId) =>
	async function (dispatch, _getState, { api, router }) {
		dispatch(editTravelRequest());
		try {
			travel.favorite = checked;

			const data = { travelId, checked, userId };

			await api.travels.setTravelFavorite(data, {
				headers: { 'content-type': 'multipart/form-data' },
			});

			dispatch(editTravelSuccess(travel));
		} catch (error) {
			dispatch(editTravelFailure(error));
		}
	};

export const favoriteChangeRequest = () => ({
	type: UPDATE_FAVORITE_REQUEST,
});

export const favoriteChangeSuccess = travel => ({
	type: UPDATE_FAVORITE_SUCCESS,
	payload: travel,
});

export const favoriteChangeFailure = error => ({
	type: UPDATE_FAVORITE_FAILURE,
	error: true,
	payload: error,
});
