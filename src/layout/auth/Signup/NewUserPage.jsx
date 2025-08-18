import Loading from '../../utils/spinner/Loading';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Layout from '../../Layout';
import './newUserPage.css';
import Form from './Form';

function NewUserPage() {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
	}, []);

	return (
		<Layout>
			<section
				id="neu-user"
				className="masthead register-form-page"
			>
				<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
					<div className="text-center">
						<h1 className="mx-auto my-0 text-uppercase new-space-traveler-title">
							{t('new-user-page.new-user-title')}
						</h1>
						{loading ? <Form /> : <Loading />}
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default NewUserPage;
