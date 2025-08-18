import { formatDate, formatDateTime } from '../utils/formatDateFunctions';
import { fetchLocations, fetchTravels } from '../../redux/actions';
import Loading from '../../layout/utils/spinner/Loading';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import FavoriteHeart from '../utils/FavoriteHeart';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IconMsg from '../chat/IconMsg';
import Filters from './Filter';
import Layout from '../Layout';
import './css/travels.css';
import {
	getTravels,
	getUi,
	getLocations,
	getUserId,
	getIsLogged,
} from '../../redux/selectors';

const Travels = () => {
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const [precMax, setPrecMax] = useState(Infinity);
	const [precMin, setPrecMin] = useState(0);
	const userId = useSelector(getUserId);

	const travel = useSelector(getTravels);
	const [locationOrigin, setLocationOrigin] = useState('');
	const [locationDestination, setLocationDestination] = useState('');
	const isLogged = useSelector(getIsLogged);

	const allLocations = useSelector(getLocations);

	const [data, setData] = useState({
		sales: '',
		buy: '',
		priceMin: 0,
		priceMax: Infinity,
	});

	const [currentPage, setCurrentPage] = useState(1);
	const adsPerPage = 6;

	useEffect(() => {
		dispatch(fetchTravels());
		dispatch(fetchLocations());
	}, [dispatch]);

	let travels = travel;
	let locationsOrigin = allLocations;
	let locationsDestination = allLocations;

	if (precMax === '') {
		setPrecMax(Infinity);
	}

	if (!!locationOrigin) {
		const resultDestination = locationsDestination.filter(
			location => location.name !== locationOrigin
		);

		locationsDestination = resultDestination;
	}

	if (!!locationDestination) {
		const resultOrigin = locationsOrigin.filter(
			location => location.name !== locationDestination
		);

		locationsOrigin = resultOrigin;
	}

	travels = Filters(
		travels,
		search,
		precMax,
		precMin,
		locationOrigin,
		locationDestination
	);

	// Busqueda por palabras
	const searcher = e => {
		setSearch(e.target.value);
	};

	const handleChangeFilterPriceMax = event => {
		setData({ ...data, priceMax: event.target.value });
		setPrecMax(event.target.value);
	};

	const handleChangeFilterPriceMin = event => {
		setData({ ...data, priceMin: event.target.value });
		setPrecMin(event.target.value);
	};

	const { isLoading, error } = useSelector(getUi);

	const indexOfLastAd = currentPage * adsPerPage;
	const indexOfFirstAd = indexOfLastAd - adsPerPage;

	const adsToShow = travels.slice(indexOfFirstAd, indexOfLastAd);

	const pageNumbers = Math.ceil(travels.length / adsPerPage);

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
	const { t } = useTranslation();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Layout>
			<section className="travels-first-container">
				<div className="container travels-container">
					<div className="row">
						<section className="filter-section">
							<form className="filter-form text-white-50">
								<span className="search-text text-white-50">
									{t('travels_section.filter-1')}
								</span>
								<input
									type="text"
									value={search}
									onChange={searcher}
									placeholder={t('travels_section.filter-1-1')}
									name="search"
									className="form-Control"
								/>
								<label
									className="labelAdvertsPage"
									name="price"
								>
									{t('travels_section.filter-2')}
								</label>
								<input
									className="inputPriceMinAdvertsPage"
									type="number"
									pattern="filtro precio"
									name="price"
									value={data.sales.value}
									onChange={handleChangeFilterPriceMin}
									placeholder={t('travels_section.filter-2-1')}
								/>
								<label
									className="labelAdvertsPage"
									name="price"
								>
									{t('travels_section.filter-3')}
								</label>
								<input
									className="inputPriceMaxAdvertsPage"
									type="number"
									pattern="filtro precio"
									name="price"
									value={data.sales.value}
									onChange={handleChangeFilterPriceMax}
									placeholder={t('travels_section.filter-3-1')}
								/>
								<label className="origin">{t('travels_section.origin')}</label>
								<select
									name="origin"
									id="origin"
									onChange={e => setLocationOrigin(e.target.value)}
								>
									<option value="">{t('travels_section.select')}</option>
									{locationsOrigin.map(location => (
										<option
											key={location._id}
											value={location.name}
										>
											{location.name}
										</option>
									))}
								</select>
								<label className="origin">
									{t('travels_section.destination')}
								</label>
								<select
									name="destination"
									id="destination"
									onChange={e => setLocationDestination(e.target.value)}
								>
									<option value="">{t('travels_section.select')}</option>
									{locationsDestination.map(location => (
										<option
											key={location._id}
											value={location.name}
										>
											{location.name}
										</option>
									))}
								</select>
							</form>
						</section>
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
												{t('travels_section.published')}
												<br></br>
												{formatDate(travel.datetimeCreation)}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.remarks')}
												<br></br>
												{travel.remarks}
											</p>
											<div className="price">
												<span>
													{t('travels_section.price')}
													<br></br>
													{travel.price}€
												</span>
											</div>
											{travel.forSale ? (
												<p className="text-travels-ads">
													{t('travels_section.sale')}
												</p>
											) : (
												<p className="text-travels-ads">
													{t('travels_section.search')}
												</p>
											)}
											<p className="text-travels-ads">
												{t('travels_section.origin')}
												<br></br>
												{travel.origin}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.destination')}
												<br></br>
												{travel.destination}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.travel-date')}
												<br></br>
												{formatDateTime(travel.datetimeDeparture)}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.travellers')}
												<br></br>
												{travel.availableSeats}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.available-seats')}
												<br></br>
												{travel.availableSeats - travel.soldSeats}
											</p>
											<p className="text-travels-ads">
												{t('travels_section.user')}
												<Link
													to={`/travel-user/${travel.userName}`}
													class="text-decoration-none"
												>
													{travel.userName}
												</Link>
											</p>
											<div className="product-button-group">
												{!travel.forSale ? (
													<Link
														to={`/travel/${travel.topic}/${travel._id}`}
														className="add-to-cart"
													>
														<i className="fa fa-shopping-bag"></i>
														{t('travels_section.contact')}
														{/* 														{travel.active
															? 'CONTACTAR'
															: travel.userBuyer.includes(userId)
															? 'YA LO HAS COMPRADO'
															: 'VIAJE COMPLETO'} */}
													</Link>
												) : (
													<Link
														to={`/travel/${travel.topic}/${travel._id}`}
														className="add-to-cart"
													>
														<i className="fa fa-shopping-bag"></i>
														{travel.active
															? travel.userBuyer.includes(userId)
																? t('travels_section.already-buy')
																: t('travels_section.travel-here')
															: t('travels_section.complete-travel')}
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
								</div>
							))
						) : (
							<p>{t('travels_section.no-data-travel')}</p>
						)}
					</div>
				</div>
				<div className="pagination-container">{renderPageNumbers()}</div>
				{error ? (
					<div className="error">
						<p> {error}</p>
					</div>
				) : null}
			</section>
		</Layout>
	);
};

export default Travels;
