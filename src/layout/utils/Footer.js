import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
	const { t } = useTranslation();
	return (
		<footer className="footer bg-black small text-center text-white-50">
			<div className="container px-4 px-lg-5">
				{<a>Copyright &copy; {t('footer.text')}</a>}
			</div>
		</footer>
	);
}

export default Footer;
