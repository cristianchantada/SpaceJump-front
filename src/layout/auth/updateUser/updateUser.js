import { authUpdateUser, resetErrors } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../utils/spinner/Loading';
import { useTranslation } from 'react-i18next';
import Input from '../Signup/Input';
import Layout from '../../Layout';
import { useState } from 'react';
import { getEmail, getUi, getUserName } from '../../../redux/selectors';

function UpdateUser() {
	let { isLoading, error } = useSelector(getUi);
	const userEmail = useSelector(getEmail);
	const userName = useSelector(getUserName);
	const dispatch = useDispatch();
	const [user, setUser] = useState(userName);
	const [email, setEmail] = useState(userEmail);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const resetError = () => {
		dispatch(resetErrors());
	};

	const credential = {
		user,
		email,
		password,
		passwordConfirm,
	};

	const { t } = useTranslation();

	const handleSubmit = async event => {
		event.preventDefault();
		await dispatch(authUpdateUser(credential, true));
	};
	const disableButton =
		!credential.passwordConfirm && !credential.password && !credential.user;

	return (
		<Layout>
			<section
				id="neu-user"
				className="masthead update-user-form-page"
			>
				<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
					<div className="text-center">
						<h1 className="mx-auto my-0 text-uppercase new-space-traveler-title">
							{t('update-user.update-user-title')}
						</h1>
						<form
							onSubmit={handleSubmit}
							className="space-login-form"
						>
							{isLoading ? (
								<Loading />
							) : (
								<>
									<Input
										placeholder={userName}
										tiLabel={t('update-user.username-label')}
										type="text"
										name="user"
										id="user"
										required={false}
										handleInput={e => setUser(e.target.value)}
									/>
									<Input
										placeholder={userEmail}
										tiLabel={t('update-user.email-label')}
										type="email"
										name="email"
										id="email"
										required={false}
										handleInput={e => setEmail(e.target.value)}
										readOnly={true}
									/>
									<Input
										tiLabel={t('update-user.password-label')}
										type="password"
										name="password"
										id="password"
										required={false}
										handleInput={e => setPassword(e.target.value)}
									/>
									<Input
										tiLabel={t('update-user.password-confirm-label')}
										type="password"
										name="passwordConfirm"
										id="passwordConfirm"
										required={false}
										handleInput={e => setPasswordConfirm(e.target.value)}
									/>
									<button
										type="submit"
										className="btn btn-primary"
										data-testid="signUpButton"
										disabled={disableButton}
									>
										{t('update-user.update-button')}
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
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default UpdateUser;
