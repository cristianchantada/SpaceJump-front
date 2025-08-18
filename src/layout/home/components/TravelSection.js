import Rocket from '../../utils/rocket/Rocket';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

function TravelSection() {
	const { t } = useTranslation();
	return (
		<header className="masthead">
			{
				<div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
					<div className="d-flex justify-content-center">
						<div className="text-center">
							<h1 className="mx-auto text-uppercase travel-title">
								{t('travel_section.title')}
							</h1>
							<h2 className="text-white-50 mx-auto mt-2 mb-5">
								{t('travel_section.description')}
							</h2>
							<Link
								to="/travels"
								className="btn btn-primary"
							>
								{t('travel_section.start-journey')}
								<Rocket />
							</Link>
						</div>
					</div>
				</div>
			}
		</header>
	);
}

export default TravelSection;
