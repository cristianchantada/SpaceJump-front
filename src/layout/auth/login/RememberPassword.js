import { authPassword, resetErrors } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../utils/spinner/Loading';
import { getUi } from '../../../redux/selectors';
import { useState } from 'react';

function RememberPassword() {
	const dispatch = useDispatch();
	let { isLoading, error } = useSelector(getUi);
	const handleSubmit = async event => {
		event.preventDefault();
		await dispatch(authPassword(credential));
	};

	const resetError = () => {
		dispatch(resetErrors());
	};
	const [credential, setCredential] = useState({
		email: '',
	});
	const handleChange = event => {
		if (event.target.name === 'email') {
			setCredential({ ...credential, email: event.target.value }); //con esto vemos si escribe en los imput o no
		}
	};

	const disableButton = !credential.email;

	return (
		<section
			id="neu-password"
			className="masthead"
		>
			<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
				<div className="text-center">
					<h1 className="mx-auto my-0 text-uppercase">New Space Traveler</h1>
					{isLoading ? (
						<Loading />
					) : (
						<form onSubmit={handleSubmit}>
							<p className="text-white-50 mx-auto mt-2 mb-5">
								<label>
									Email
									<br />
									<input
										type="email"
										name="email"
										id="email"
										data-testid="email"
										placeholder="Write your Email "
										required
										onChange={handleChange}
									/>
								</label>
							</p>
							<p>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={disableButton}
									data-testid="signUpButton"
								>
									Remember
								</button>
							</p>

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
					)}
				</div>
			</div>
		</section>
	);
}

export default RememberPassword;
