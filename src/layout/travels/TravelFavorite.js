import { getIsLogged, getUserId, getUserName } from '../../redux/selectors';
import { getTravelFavorite } from '../../api/serviceTravels';
import FavoriteHeart from '../utils/FavoriteHeart';
import Loading from '../utils/spinner/Loading';
import { useEffect, useState } from 'react';
import UserPanel from '../utils/UserPanel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconMsg from '../chat/IconMsg';
import Layout from '../Layout';
import './css/travelUser.css';

const TravelFavorite = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [travelsData, setTravelsData] = useState([]);
	const user = useSelector(getUserName);
	const isLogged = useSelector(getIsLogged);
	const userId = useSelector(getUserId);

	// Estado para la paginación
	const [currentPage, setCurrentPage] = useState(1);
	const adsPerPage = 9;

	useEffect(() => {
		setTravelsData([]);
		const fetchData = async () => {
			const data = { user };
			try {
				const travelsData = await getTravelFavorite(data, {
					headers: { 'content-type': 'multipart/form-data' },
				});

				if (travelsData?.status === 400) {
					setError(travelsData.message);
				}
				if (travelsData?.status === 'OK') {
					setTravelsData(travelsData.result);
				}
				setIsLoading(true);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();
	}, [user]);

	const resetError = () => {
		setError(null);
	};

	// Calcula el índice del primer y último anuncio que se mostrará en la página actual
	const indexOfLastAd = currentPage * adsPerPage;
	const indexOfFirstAd = indexOfLastAd - adsPerPage;

	// Filtra los anuncios que se mostrarán en la página actual
	const adsToShow = travelsData.slice(indexOfFirstAd, indexOfLastAd);

	// Calcula el número de páginas
	const pageNumbers = Math.ceil(travelsData.length / adsPerPage);

	function formatDate(datetimeCreation) {
		const dateObj = new Date(datetimeCreation);
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();

		return `${day}-${month}-${year}`;
	}

	const renderPageNumbers = () => {
		return (
			<ul className="pagination">
				{Array.from({ length: pageNumbers }, (_, index) => (
					<li
						key={index}
						className={currentPage === index + 1 ? 'active' : ''}
					>
						<button onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</button>
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<Layout>
				{isLoading ? (
					<section className="travels-first-container">
						<div className="container travels-container">
							<div className="row">
								<h1>Travels to {user}</h1>

								<UserPanel
									user={user}
									origin={'favorite'}
								/>

								{adsToShow ? (
									adsToShow.map(travel => (
										<div
											key={travel._id}
											className="col-md-3 col-sm-6 travels-columns"
										>
											<div className="product-grid">
												{travel.photo ? (
													<div className="product-image">
														<img
															src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
															alt={travel.topic}
														/>
													</div>
												) : null}
												<div className="product-content">
													<h3 className="title">
														<Link to={`/travel/${travel.topic}/${travel._id}`}>
															{travel.topic}
														</Link>
													</h3>
													<p className="text-travels-ads">
														Remarks: {travel.remarks}
													</p>
													<div className="price">
														<span>Price: {travel.price}€</span>
														{/* travel.discount && <span> {travel.originalPrice}€</span> */}
													</div>
													{travel.forSale ? (
														<p className="text-travels-ads">Sale</p>
													) : (
														<p className="text-travels-ads">Search</p>
													)}
													<p className="text-travels-ads">
														Origin: {travel.origin}
													</p>
													<p className="text-travels-ads">
														Destination: {travel.destination}
													</p>
													<p className="text-travels-ads">
														User :
														<Link
															to={`/travel-user/${travel.userName}`}
															class="text-decoration-none"
														>
															{travel.userName}
														</Link>
													</p>
													<p className="text-travels-ads">
														Travel Date: {formatDate(travel.datetimeCreation)}
													</p>
												</div>
												<div className="product-button-group">
													{!travel.forSale ? (
														<Link
															to={`/travel/${travel._id}`}
															className="add-to-cart"
														>
															<i className="fa fa-shopping-bag"></i>
															{travel.active ? 'CONTACTAR' : 'VIAJE COMPLETO'}
														</Link>
													) : (
														<Link
															to={`/travel/${travel._id}`}
															className="add-to-cart"
														>
															<i className="fa fa-shopping-bag"></i>
															{travel.active
																? 'VIAJAR AQUÍ '
																: 'VIAJE COMPLETO'}
														</Link>
													)}

													{isLogged && userId !== travel.userId ? (
														<div className="product-compare-icon">
															<FavoriteHeart
																travelId={travel._id}
																checked={travel.favorite}
															/>
															<IconMsg travelId={travel._id} />
														</div>
													) : null}
												</div>
											</div>
										</div>
									))
								) : (
									<p>No travel data available.</p>
								)}
							</div>
						</div>
					</section>
				) : (
					<>
						<Loading />
					</>
				)}

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
				{renderPageNumbers()}
			</Layout>
		</>
	);
};

export default TravelFavorite;
