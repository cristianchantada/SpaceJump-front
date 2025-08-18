import { authUpdateUser, resetErrors } from '../../../redux/actions';
import { getNewPassword } from '../../../api/serviceAuth';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../utils/spinner/Loading';
import { getUi } from '../../../redux/selectors';
import { useParams } from 'react-router-dom';
import Input from '../Signup/Input';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import Layout from '../../Layout';

function UpdatePassword() {
	let { isLoading, error } = useSelector(getUi);

	const dispatch = useDispatch();

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const { token } = useParams();

	const resetError = () => {
		dispatch(resetErrors());
	};

	getNewPassword(token);
	const abc = jwtDecode(token);
	const [user, setUser] = useState(abc.userName);
	const [email, setEmail] = useState(abc.email);
	const credential = {
		user,
		email,
		password,
		passwordConfirm,
	};

	const handleSubmit = async event => {
		event.preventDefault();
		await dispatch(authUpdateUser(credential, false));
	};
	const disableButton = !credential.passwordConfirm && !credential.password;

	return (
		<Layout>
			<section
				id="neu-user"
				className="masthead"
			>
				<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
					<div className="text-center">
						<h1 className="mx-auto my-0 text-uppercase">Update Password</h1>
						<form onSubmit={handleSubmit}>
							{isLoading ? (
								<Loading />
							) : (
								<>
									<Input
										placeholder={abc.userName}
										tiLabel="Name User"
										type="text"
										name="user"
										id="user"
										required={false}
										readOnly={true}
									/>
									<Input
										placeholder={abc.email}
										tiLabel="Email"
										type="email"
										name="email"
										id="email"
										required={false}
										handleInput={e => setEmail(e.target.value)}
										readOnly={true}
									/>
									<Input
										tiLabel="Password"
										type="password"
										name="password"
										id="password"
										required={false}
										handleInput={e => setPassword(e.target.value)}
									/>
									<Input
										tiLabel="Password Confirm"
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
										Sign Up
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

export default UpdatePassword;
