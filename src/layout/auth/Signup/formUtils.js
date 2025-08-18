import { signUp } from '../../../api/auth';

export const isButtonDisabled = (user, email, password, passwordConfirm) => {
	if (
		!!user?.length &&
		!!email?.length &&
		!!password?.length &&
		!!passwordConfirm?.length
	) {
		return false;
	} else {
		return true;
	}
};

export const isPasswordEqual = (password, passwordConfirm) => {
	if (password !== passwordConfirm) {
		return 'password confirmation does not match';
	} else {
		return '';
	}
};

export const createNewUser = async (user, email, password) => {
	const data = {
		user,
		email,
		password,
	};

	try {
		const newUser = await signUp(data, {
			headers: { 'content-type': 'multipart/form-data' },
		});

		return newUser;
	} catch (error) {
		return error;
	}
};
