import {
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	UI_RESET_ERROR,
	UI_SIGNUP_FAILURE,
	UI_SIGNUP_REQUEST,
	UI_SIGNUP_SUCCESS,
	FETCH_TRAVELS_SUCCESS,
	CREATE_TRAVEL_SUCCESS,
	DELETE_TRAVEL_SUCCESS,
	FETCH_LOCATIONS_SUCCESS,
	UI_DELETE_USER_REQUEST,
	UI_DELETE_USER_SUCCESS,
	UI_DELETE_USER_FAILURE,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	UPDATE_USER_REQUEST,
	EDIT_TRAVEL_SUCCESS,
	DELETE_PHOTO_SUCCESS,
	FETCH_SINGLE_TRAVEL_SUCCESS,
	AUTH_DETAIL_SUCCESS,
	BUY_TRAVEL_SUCCESS,
	FILTER_TRAVELS_SUCCESS,
	CLOSE_OPEN_TRAVEL_SUCCESS,
	UPDATE_FAVORITE_SUCCESS,
} from './types';

export const defaultState = {
	auth: {
		isLogged: false,
		userId: null,
		email: null,
		userName: null,
	},
	travels: {
		areLoaded: false,
		data: [],
	},
	chats: {
		areLoaded: false,
		data: [],
	},
	locations: [],
	ui: {
		isLoading: false,
		error: null,
	},
};

export function travels(state = defaultState.travels, action) {
	switch (action.type) {
		case FETCH_TRAVELS_SUCCESS:
			return { areLoaded: true, data: action.payload };
		case FILTER_TRAVELS_SUCCESS:
			return { areLoaded: true, data: action.payload };
		case FETCH_SINGLE_TRAVEL_SUCCESS:
			return { ...state, data: [action.payload] };
		case CREATE_TRAVEL_SUCCESS:
			return { ...state, data: [...state.data, action.payload] };
		case EDIT_TRAVEL_SUCCESS:
			return {
				...state,
				data: state.data.map(travel =>
					travel._id === action.payload._id ? action.payload : travel
				),
			};
		case BUY_TRAVEL_SUCCESS:
			return {
				...state,
				data: state.data.map(travel =>
					travel._id === action.payload._id ? action.payload : travel
				),
			};
		case DELETE_TRAVEL_SUCCESS:
			return {
				...state,
				data: state.data.filter(travel => travel.id !== action.payload),
			};
		case DELETE_PHOTO_SUCCESS:
			return {
				...state,
				data: state.data.map(travel =>
					travel._id === action.payload ? { ...travel, photo: null } : travel
				),
			};
		case CLOSE_OPEN_TRAVEL_SUCCESS:
			return {
				...state,
				data: state.data.map(travel =>
					travel._id === action.payload._id ? action.payload : travel
				),
			};

		case UPDATE_FAVORITE_SUCCESS:
			return {
				...state,
				data: state.data.map(travel =>
					travel._id === action.payload._id ? action.payload : travel
				),
			};

		default:
			return state;
	}
}

export function locations(state = defaultState.locations, action) {
	switch (action.type) {
		case FETCH_LOCATIONS_SUCCESS:
			return action.payload;
		default:
			return state;
	}
}

export function auth(state = defaultState.auth, action) {
	//esta parte del reducer solo tiene en cuenta la paerte de auth
	switch (action.type) {
		case AUTH_LOGIN_SUCCESS:
			return {
				isLogged: true,
				userId: action.payload.userId,
				email: action.payload.email,
				userName: action.payload.userName,
			}; //clonamos el estado y le cambiamos la autenticacion a true o false si esta o no logeado
		case AUTH_LOGOUT:
			return { isLogged: false, userId: null, email: null };
		case AUTH_LOGIN_FAILURE:
			return { isLogged: false, userId: null, email: null };
		case UPDATE_USER_SUCCESS:
			return { ...state, userName: action.payload.userName }; //clonamos el estado y le cambiamos la autenticacion a true o false si esta o no logeado
		case UPDATE_USER_FAILURE:
			return { ...state };
		case AUTH_DETAIL_SUCCESS:
			return {
				isLogged: true,
				userId: action.payload.userId,
				email: action.payload.email,
				userName: action.payload.userName,
			};

		default:
			return state;
	}
}

export function ui(state = defaultState.ui, action) {
	if (action.error) {
		return { isLoading: false, error: action.payload };
	}

	if (/_REQUEST$/.test(action.type)) {
		//todas las acciones que acaben en request
		return { isLoading: true, error: null };
	}

	if (/_SUCCESS$/.test(action.type)) {
		return { isLoading: false, error: null };
	}
	if (action.type === UI_RESET_ERROR) {
		return { ...state, error: null };
	}

	/* Create User */
	if (action.type === UI_SIGNUP_SUCCESS) {
		return { isLoading: true, error: null };
	}
	if (action.type === UI_SIGNUP_REQUEST) {
		return { isLoading: false, error: null };
	}
	if (action.type === UI_SIGNUP_FAILURE) {
		return { isLoading: false, error: action.payload };
	}

	/* Delete User */
	if (action.type === UI_DELETE_USER_SUCCESS) {
		return { isLoading: true, error: null };
	}
	if (action.type === UI_DELETE_USER_REQUEST) {
		return { isLoading: false, error: null };
	}
	if (action.type === UI_DELETE_USER_FAILURE) {
		return { isLoading: false, error: action.payload };
	}

	//Update User

	if (action.type === UPDATE_USER_SUCCESS) {
		return { isLoading: true, error: null };
	}
	if (action.type === UPDATE_USER_REQUEST) {
		return { isLoading: false, error: null };
	}
	if (action.type === UPDATE_USER_FAILURE) {
		return { isLoading: false, error: action.payload };
	}

	return state;
}
