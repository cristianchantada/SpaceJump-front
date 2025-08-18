import { authDeleteUser, resetErrors } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isButtonDisabled } from '../Signup/formUtils';
import Loading from '../../utils/spinner/Loading';
import { useTranslation } from 'react-i18next';
import { getUi } from '../../../redux/selectors';
import { useEffect, useState } from 'react';
import Input from '../Signup/Input';

function FormDeleteUser({ userId }) {
	const { t } = useTranslation();
	let { isLoading, error } = useSelector(getUi);

	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		setButtonDisabled(
			isButtonDisabled('user', email, password, passwordConfirm)
		);
	}, [email, password, passwordConfirm]);

	const handleSubmit = async event => {
		event.preventDefault();
		const data = {
			userId,
			email,
			password,
			passwordConfirm,
		};

		await dispatch(authDeleteUser(data));
	};

	const resetError = () => {
		dispatch(resetErrors());
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-login-form"
		>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Input
						tiLabel={t('delete-user.email-label')}
						type="email"
						name="email"
						id="email"
						handleInput={e => setEmail(e.target.value)}
					/>
					<Input
						tiLabel={t('delete-user.password-label')}
						type="password"
						name="password"
						id="password"
						handleInput={e => setPassword(e.target.value)}
					/>
					<Input
						tiLabel={t('delete-user.password-confirm-label')}
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						handleInput={e => setPasswordConfirm(e.target.value)}
					/>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={buttonDisabled}
						data-testid="signUpButton"
					>
						{t('delete-user.confirm-button')}
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
}

export default FormDeleteUser;
