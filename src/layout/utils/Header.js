import { getIsLogged, getUserId, getUserName } from '../../redux/selectors';
import { authSuccess, actionLogout } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import flagEn from '../../assets/img/flag_en.png';
import flagEs from '../../assets/img/flag_es.png';
import IconHeaderMsg from '../chat/IconHeaderMsg';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../../api/serviceAuth';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import storage from './storage';

function Header() {
	const { t, i18n } = useTranslation();
	const changeLanguage = language => {
		i18n.changeLanguage(language);
		Cookies.set('selectedLanguage', language, { expires: 30 }); // La cookie de idioma expira en 30 días.
	};
	const isLogged = useSelector(getIsLogged);
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const userName = useSelector(getUserName);

	//Effect to search de userId
	useEffect(() => {
		const fetchData = () => {
			if (!userId) {
				const accessToken = storage.get('auth');

				if (accessToken !== null) {
					const base64Url = accessToken.split('.')[1];
					const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
					const jsonPayload = decodeURIComponent(
						window
							.atob(base64)
							.split('')
							.map(function (c) {
								return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
							})
							.join('')
					);
					const jsonweb = JSON.parse(jsonPayload);

					dispatch(authSuccess(jsonweb));
				}
			}
		};

		fetchData();
	}, [userId, dispatch]);

	const handlerLogout = () => {
		logout();
		Cookies.remove('selectedLanguage');
		dispatch(actionLogout());
	};
	return (
		<nav
			className="navbar navbar-expand-lg navbar-light fixed-top"
			id="mainNav"
		>
			<li className="nav-item dropdown language-selector">
				<button
					className="nav-link dropdown-toggle language-selector-button"
					id="languageDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img
						src={i18n.language === 'en' ? flagEn : flagEs}
						alt={i18n.language.toUpperCase()}
						className="language-flag"
					/>
				</button>
				<ul
					className="dropdown-menu language-menu"
					aria-labelledby="languageDropdown"
				>
					<li>
						<button
							onClick={() => changeLanguage('en')}
							className="dropdown-item language-option"
						>
							<img
								src={flagEn}
								alt="EN"
								className="language-flag"
							/>
							<span className="language-text">EN</span>
						</button>
					</li>
					<li>
						<button
							onClick={() => changeLanguage('es')}
							className="dropdown-item language-option"
						>
							<img
								src={flagEs}
								alt="ES"
								className="language-flag"
							/>
							<span className="language-text">ES</span>
						</button>
					</li>
				</ul>
			</li>
			{isLogged ? (
				<>
					<span className="greetings">
						{t('navbar.greetings')}
						{userName}
						<Link
							to={`/travel-user/${userName}`}
							className="text-decoration-none user-panel"
						>
							{t('navbar.user-panel')}
						</Link>
					</span>
					<IconHeaderMsg />
				</>
			) : (
				<span className="greetings">{t('navbar.greetings-nonuser')}</span>
			)}
			{
				<div className="container px-4 px-lg-5 navbar-style">
					<button
						className="navbar-toggler navbar-toggler-right"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						{t('navbar.menu_mobile')}
						<i className="fas fa-bars"></i>
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarResponsive"
					>
						<NavLink
							to="/"
							className="navbar-brand nav-NavLink home-button"
						>
							{t('navbar.home')}
						</NavLink>
						<ul className="navbar-nav ms-auto">
							<li className="nav-item">
								<NavLink
									to="/travels"
									className="nav-NavLink"
								>
									{t('navbar.travels')}
								</NavLink>
							</li>
							{isLogged ? (
								<>
									<li className="nav-item">
										<NavLink
											to="/newtravel"
											className="nav-NavLink"
										>
											{t('navbar.create-travel')}
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/updateUser"
											className="nav-NavLink"
										>
											{t('navbar.update-user')}
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/deleteUser"
											className="nav-NavLink"
										>
											{t('navbar.delete-user')}
										</NavLink>
									</li>

									<li className="nav-item">
										<NavLink
											onClick={handlerLogout}
											className="nav-NavLink"
											to="/login"
										>
											{' '}
											{t('navbar.logout-user')}{' '}
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<NavLink
											to="/signup"
											className="nav-NavLink"
										>
											{t('navbar.new-user')}
										</NavLink>
									</li>

									<li className="nav-item">
										<NavLink
											to="/login"
											className="nav-NavLink"
										>
											{t('navbar.login-user')}
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			}
		</nav>
	);
}

export default Header;
