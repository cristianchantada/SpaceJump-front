import { getLocations, getTravelById, getUi } from '../redux/selectors';
import videoBackground from '../assets/video/new-travel-background.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/utils/spinner/Loading';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import resizeFile from '../utils/resizeFile';
import DatePicker from 'react-datepicker';
import Layout from '../layout/Layout';
import './componentTravels.css';
import {
	fetchLocations,
	editTravel,
	deletePhoto,
	fetchSingleTravel,
} from '../redux/actions';

function EditTravelPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [travel, setTravel] = useState({});
	const editTrip = useSelector(getTravelById(id));
	const { isLoading, error } = useSelector(getUi);

	useEffect(() => {
		if (editTrip) {
			editTrip.datetimeDeparture = new Date(editTrip.datetimeDeparture);
			setTravel(editTrip);
		} else {
			const trip = dispatch(fetchSingleTravel(id));
			editTrip.datetimeDeparture = new Date(editTrip.datetimeDeparture);
			setTravel(trip);
		}
	}, [dispatch, id, editTrip]);

	const locations = useSelector(getLocations);
	useEffect(() => {
		if (locations.length !== 0) {
			return;
		}
		dispatch(fetchLocations());
	}, [dispatch, locations]);

	// Eliminación de la imagen desde icono.

	const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
		useState(false);

	const handleDeletePhoto = () => {
		setIsDeleteConfirmationVisible(true);
	};

	const confirmDeletePhoto = () => {
		dispatch(deletePhoto(id, travel));
		setIsDeleteConfirmationVisible(false);
	};

	const cancelDeletePhoto = () => {
		setIsDeleteConfirmationVisible(false);
	};

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(editTravel(id, travel));
	};

	const navigate = useNavigate();
	const handleReturn = () => {
		navigate(`/travel/${travel.topic}/${id}`);
	};

	const [isPastDate, setIsPastDate] = useState(false);

	const handleDate = date => {
		const now = new Date();
		if (date < now) {
			setTravel({ ...travel, datetimeDeparture: null });
			setIsPastDate(true);
			return;
		} else {
			setIsPastDate(false);
		}
		const event = { target: { value: date, name: 'datetimeDeparture' } };
		handleChange(event);
	};
	const { t } = useTranslation();

	const handleChange = async event => {
		const { name, value } = event.target;

		if (name === 'photo') {
			const image = await resizeFile(event.target.files[0]);
			setTravel({ ...travel, [name]: image });
			return;
		}
		if (name === 'forSale' && value === 'false') {
			setTravel({
				...travel,
				[name]: false,
				availableSeats: undefined,
				soldSeats: undefined,
			});
			return;
		}
		if (name === 'availableSeats') {
			setTravel({ ...travel, [name]: value, soldSeats: 0 });
			return;
		}

		setTravel({ ...travel, [name]: value });
	};

	const minDate = new Date();
	minDate.setHours(0, 0, 0, 0);

	const isDisabled =
		!travel.topic ||
		!travel.origin ||
		!travel.destination ||
		!travel.price ||
		!travel.datetimeDeparture;

	if (isLoading) {
		return <Loading />;
	}
	return (
		<Layout>
			<section
				id="new-travel"
				className="masthead new-travel-page"
			>
				<video
					className="video-background"
					autoPlay
					muted
					loop
				>
					<source
						src={videoBackground}
						type="video/mp4"
					/>
				</video>
				<div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center new-travel-all-form">
					<div className="text-center">
						<h1 className="mx-auto my-0 text-uppercase edit-travel-page-title">
							{t('edit-travel-page.title')}
						</h1>
						{travel.photo ? (
							<>
								<div className="product-image-edit-travel">
									<img
										className="img-visualized"
										src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${editTrip.photo}`}
										alt={travel.topic}
									/>
									<div className="delete-photo-overlay-edit-travel">
										<button
											onClick={handleDeletePhoto}
											className="delete-photo-button-edit-travel"
										>
											<FontAwesomeIcon icon={faTrash} />
											<br />
											{t('edit-travel-page.delete-photo')}
										</button>
										{isDeleteConfirmationVisible && (
											<div className="delete-confirmation-edit-travel">
												<p>{t('edit-travel-page.confirm-photo')}</p>
												<button onClick={confirmDeletePhoto}>
													{t('edit-travel-page.confirm')}
												</button>
												<button onClick={cancelDeletePhoto}>
													{t('edit-travel-page.cancel')}
												</button>
											</div>
										)}
									</div>
								</div>
							</>
						) : null}
						<form
							onSubmit={handleSubmit}
							className="new-travel-form"
						>
							<label htmlFor="topic">
								{t('edit-travel-page.travel-title')}
							</label>
							<input
								value={travel.topic}
								onChange={handleChange}
								type="text"
								name="topic"
								id="topic"
								required
							/>
							<label
								htmlFor="origin"
								className="origin-label"
							>
								{t('edit-travel-page.travel-origin')}
							</label>
							<select
								value={travel.origin}
								onChange={handleChange}
								type="string"
								name="origin"
								id="origin"
								required
							>
								{locations.map(location => (
									<option
										key={location.name}
										value={location.name}
									>
										{location.name}
									</option>
								))}
							</select>
							<label
								htmlFor="destination"
								className="destination-label"
							>
								{t('edit-travel-page.travel-destination')}
							</label>
							<select
								value={travel.destination}
								onChange={handleChange}
								type="string"
								name="destination"
								id="destination"
								required
							>
								{locations.map(location => (
									<option
										key={location.name}
										value={location.name}
									>
										{location.name}
									</option>
								))}
							</select>
							<br />
							<label>{t('edit-travel-page.travel-departure-time')}</label>
							<br />
							<DatePicker
								selected={travel.datetimeDeparture}
								onChange={handleDate}
								dateFormat="dd/MM/yyyy HH:mm"
								timeIntervals={5}
								showTimeSelect
								required
								minDate={minDate}
								maxDate={null}
								timeFormat="HH:mm"
								placeholderText="Click para seleccionar fecha"
							/>
							{isPastDate && (
								<div
									className="warning-message"
									style={{ color: 'red' }}
								>
									{t('edit-travel-page.travel-departure-error')}
								</div>
							)}
							<br />
							<label htmlFor="price">
								{t('edit-travel-page.travel-price')}
							</label>
							<input
								value={travel.price}
								onChange={handleChange}
								type="number"
								name="price"
								id="price"
								required
							/>
							{travel.forSale ? (
								<>
									<label htmlFor="availableSeats">
										{t('edit-travel-page.seats-available')}
									</label>
									<input
										value={travel.availableSeats}
										onChange={handleChange}
										type="number"
										name="availableSeats"
										id="availableSeats"
										required
									/>
								</>
							) : null}
							<label htmlFor="remarks">
								{t('edit-travel-page.travel-remarks')}
							</label>
							<textarea
								value={travel.remarks}
								onChange={handleChange}
								name="remarks"
								id="remarks"
							></textarea>
							<label htmlFor="photo">
								{t('edit-travel-page.upload-photo')}
							</label>
							<input
								onChange={handleChange}
								type="file"
								name="photo"
								id="photo"
							/>
							<button
								type="submit"
								disabled={isDisabled}
								className='m-2'
							>
								{t('edit-travel-page.update-travel')}
							</button>
							<button
								type="submit"
								onClick={handleReturn}
							>
								{t('edit-travel-page.back')}
							</button>
							{error ? (
								<div className="error">
									<p> {error}</p>
								</div>
							) : null}
						</form>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default EditTravelPage;
