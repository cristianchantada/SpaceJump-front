import ExperienceImage from '../../../assets/img/vive-la-experiencia.png';
import { useTranslation } from 'react-i18next';
import React from 'react';

function ExperienceSection() {
	const { t } = useTranslation();
	return (
		<section
			className="about-section text-center"
			id="about"
		>
			{
				<div className="container px-4 px-lg-5">
					<div className="row gx-4 gx-lg-5 justify-content-center">
						<div className="col-lg-8 custom-width-text">
							<h2 className="text-white mb-4 custom-title-experience">
								{t('experience_section.title')}
							</h2>
							<img
								className="img-fluid custom-margin-image"
								src={ExperienceImage}
								alt="..."
							/>
							<p className="text-white-50">{t('experience_section.text-1')}</p>
							<p className="text-white-50">{t('experience_section.text-2')}</p>
							<p className="text-white-50 last-text">
								{t('experience_section.text-3')}
							</p>
						</div>
					</div>
				</div>
			}
		</section>
	);
}

export default ExperienceSection;
