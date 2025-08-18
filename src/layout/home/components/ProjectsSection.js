import newEnvironments from '../../../assets/img/new-environments.jpg';
import differentShips from '../../../assets/img/different-ships.jpg';
import allPlanets from '../../../assets/img/all-planets.jpg';
import { useTranslation } from 'react-i18next';
import React from 'react';

function ProjectsSection() {
	const { t } = useTranslation();
	return (
		<section
			className="projects-section bg-light"
			id="projects"
		>
			{
				<div className="container px-4 px-lg-5">
					{/*Featured Project Row*/}
					<div className="row gx-0 mb-4 mb-lg-5 align-items-center">
						<div className="col-xl-8 col-lg-7">
							<img
								className="img-fluid mb-3 mb-lg-0 "
								src={allPlanets}
								alt="..."
							/>
						</div>
						<div className="col-xl-4 col-lg-5">
							<div className="featured-text text-center text-lg-left">
								<h4>{t('projects_section.title-1')}</h4>
								<p className="text-black-50 mb-0">
									{t('projects_section.text-1')}
								</p>
							</div>
						</div>
					</div>
					{/*Project One Row*/}
					<div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
						<div className="col-lg-6">
							<img
								className="img-fluid new-height-custom"
								src={newEnvironments}
								alt="..."
							/>
						</div>
						<div className="col-lg-6">
							<div className="bg-black text-center h-100 project">
								<div className="d-flex h-100">
									<div className="project-text w-100 my-auto text-center text-lg-left">
										<h4 className="text-white">
											{t('projects_section.title-2')}
										</h4>
										<p className="mb-0 text-white-50">
											{t('projects_section.text-2')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*Project two Row*/}
					<div className="row gx-0 justify-content-center">
						<div className="col-lg-6">
							<img
								className="img-fluid new-height-custom"
								src={differentShips}
								alt="..."
							/>
						</div>
						<div className="col-lg-6 order-lg-first">
							<div className="bg-black text-center h-100 project">
								<div className="d-flex h-100">
									<div className="project-text w-100 my-auto text-center text-lg-right">
										<h4 className="text-white">
											{t('projects_section.title-3')}
										</h4>
										<p className="mb-0 text-white-50">
											{t('projects_section.text-3')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</section>
	);
}

export default ProjectsSection;
