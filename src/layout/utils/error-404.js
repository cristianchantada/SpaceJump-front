import video404 from '../../assets/video/space-cat-error404.mp4';
import image404 from '../../assets/img/404-error.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

function Error404() {
	const { t } = useTranslation();
	return (
		<div className="error-404">
			<video
				autoPlay
				muted
				loop
				className="video-background"
			>
				<source
					src={video404}
					type="video/mp4"
				/>
			</video>
			<div className="content">
				<h1 className="error-text">{t('error_404.text')}</h1>
				<img
					src={image404}
					alt="Error 404"
					className="error-image"
				/>
				<br></br>
				<Link
					to="/"
					className="btn btn-primary"
				>
					{t('error_404.button')}
				</Link>
			</div>
		</div>
	);
}

export default Error404;
