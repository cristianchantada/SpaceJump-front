import { getIsLogged } from '../../../redux/selectors';
import FormDeleteUser from './FormDeleteUser';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../Signup/newUserPage.css';
import Layout from '../../Layout';

function DeleteUserPage() {
	const isLogged = useSelector(getIsLogged);
	const { t } = useTranslation();

	return (
		<Layout>
			<section
				id="neu-user"
				className="masthead delete-user-form-page"
			>
				{isLogged ? (
					<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
						<div className="text-center">
							<h1 className="mx-auto my-0 text-uppercase new-space-traveler-title">
								{t('delete-user.delete-user-title')}
							</h1>
							<FormDeleteUser />
						</div>
					</div>
				) : (
					<NavLink to="/login" />
				)}
			</section>
		</Layout>
	);
}

export default DeleteUserPage;
