import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserPanel = ({ user, origin }) => {
	const [classProperty, setClassProperty] = useState(
		'text-decoration-none m-3 '
	);
	const [classFavorite, setClassFavorite] = useState(
		'text-decoration-none m-3 '
	);
	const [classBuy, setClassBuy] = useState('text-decoration-none m-3 ');
	const [classChat, setClassChat] = useState('text-decoration-none m-3 ');

	useEffect(() => {
		switch (origin) {
			case 'property':
				setClassProperty('text-decoration-none m-3 fs-5 fw-bold ');
				break;
			case 'favorite':
				setClassFavorite('text-decoration-none m-3 fs-5 fw-bold');
				break;

			case 'buy':
				setClassBuy('text-decoration-none m-3 fs-5 fw-bold ');
				break;

			case 'chat':
				setClassChat('text-decoration-none m-3 fs-5 fw-bold ');
				break;

			default:
				break;
		}
	}, [origin]);

	return (
		<div className="navbar navbar-expand-lg ">
			<div className="container-fluid">
				<nav className="nav collapse navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								to={`/travel-user/${user}`}
								className={classProperty}
							>
								Travels on Property
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`/travel-favorite`}
								className={classFavorite}
							>
								Favorite Travels
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`/travel-buy`}
								className={classBuy}
							>
								Purchased Travels
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`/travelChat/00`}
								className={classChat}
							>
								Travel Chat
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default UserPanel;
