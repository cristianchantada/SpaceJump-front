import { authSignUp, resetErrors } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../utils/spinner/Loading';
import { getUi } from '../../../redux/selectors';
import { isButtonDisabled } from './formUtils';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Input from './Input';

const Form = () => {
	const { t } = useTranslation();
	let { isLoading, error } = useSelector(getUi);

	const dispatch = useDispatch();
	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setButtonDisabled(isButtonDisabled(user, email, password, passwordConfirm));
	}, [user, email, password, passwordConfirm]);

	const handleSubmit = async event => {
		event.preventDefault();
		const data = {
			user,
			email,
			password,
			passwordConfirm,
		};
		await dispatch(authSignUp(data));
	};

	const resetError = () => {
		dispatch(resetErrors());
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-form"
		>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Input
						tiLabel={t('new-user-page.username-label')}
						type="text"
						name="user"
						id="user"
						required={true}
						handleInput={e => setUser(e.target.value)}
					/>

					<Input
						tiLabel={t('new-user-page.email-label')}
						type="email"
						name="email"
						id="email"
						required={true}
						handleInput={e => setEmail(e.target.value)}
					/>

					<Input
						tiLabel={t('new-user-page.password-label')}
						type="password"
						name="password"
						id="password"
						required={true}
						handleInput={e => setPassword(e.target.value)}
					/>

					<Input
						tiLabel={t('new-user-page.password-confirm-label')}
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						required={true}
						handleInput={e => setPasswordConfirm(e.target.value)}
					/>

					<button
						type="submit"
						className="btn btn-primary"
						disabled={buttonDisabled}
						data-testid="signUpButton"
					>
						{t('new-user-page.signup-button')}
					</button>
				</>
			)}
			{!error ? (
				<br />
			) : (
				<div
					className="error"
					onClick={resetError}
				>
					<p data-testid="error"> {error}</p>
				</div>
			)}
		</form>
	);
};

export default Form;
