import videoBackground from '../assets/video/new-travel-background.mp4';
import { getLocations, getUserId, getUi } from '../redux/selectors';
import { createTravel, fetchLocations } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/utils/spinner/Loading';
import 'react-datepicker/dist/react-datepicker.css';
import resizeFile from '../utils/resizeFile';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import Layout from '../layout/Layout';
import './componentTravels.css';

function NewTravelPage() {
	const { t } = useTranslation();
	const userId = useSelector(getUserId);
	const { isLoading, error } = useSelector(getUi);

	const [travel, setTravel] = useState({
		topic: '',
		origin: 'Earth',
		destination: 'Earth',
		remarks: '',
		price: undefined,
		forSale: true,
		photo: undefined,
		active: true,
		userId: userId,
		datetimeDeparture: undefined,
		availableSeats: undefined,
		soldSeats: undefined,
	});

	const [minErrors, setMinErrors] = useState({
		errorMinPrize: '',
		errorMinSeats: '',
	});

	const locations = useSelector(getLocations);
	const dispatch = useDispatch();
	useEffect(() => {
		if (locations.length !== 0) {
			return;
		}
		dispatch(fetchLocations());
	}, [dispatch, locations]);

	const handleSubmit = event => {
		event.preventDefault();

		if (travel.forSale === true && travel.availableSeats <= 0) {
			setMinErrors({
				...minErrors,
				errorMinSeats: t('new-travel-seats-min-available'),
			});
			return;
		}

		if (travel.price <= 0) {
			setMinErrors({
				...minErrors,
				errorMinPrize: t('new-travel-min-price'),
			});
			return;
		}

		dispatch(createTravel(travel));
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
		!travel.datetimeDeparture ||
		(travel.forSale === true && !travel.availableSeats);

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
						<h1 className="mx-auto my-0 text-uppercase new-travel-title">
							{t('new-travel-page.title')}
						</h1>
						<form
							onSubmit={handleSubmit}
							className="new-travel-form"
						>
							<label htmlFor="topic">{t('new-travel-page.travel-title')}</label>
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
								{t('new-travel-page.travel-origin')}
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
								{t('new-travel-page.travel-destination')}
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
							<label>{t('new-travel-page.travel-departure-time')}</label>
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
								placeholderText={t('new-travel-page.date-select')}
							/>
							{isPastDate && (
								<div
									className="warning-message"
									style={{ color: 'red' }}
								>
									{t('new-travel-page.travel-departure-error')}
								</div>
							)}
							<br />
							<label htmlFor="price">{t('new-travel-page.travel-price')}</label>
							<input
								value={travel.price}
								onChange={handleChange}
								type="number"
								name="price"
								id="price"
								required
							/>
							{minErrors.errorMinPrize ? (
								<div className="error">
									<p> {minErrors.errorMinPrize}</p>
								</div>
							) : null}
							{travel.forSale ? (
								<>
									<label htmlFor="availableSeats">
										{t('new-travel-page.seats-available')}
									</label>
									<input
										value={travel.availableSeats}
										onChange={handleChange}
										type="number"
										name="availableSeats"
										id="availableSeats"
										required
									/>
									{minErrors.errorMinSeats ? (
										<div className="error">
											<p> {minErrors.errorMinSeats}</p>
										</div>
									) : null}
								</>
							) : null}
							<label htmlFor="remarks">
								{t('new-travel-page.travel-remarks')}
							</label>
							<textarea
								value={travel.remarks}
								onChange={handleChange}
								name="remarks"
								id="remarks"
							></textarea>
							<label htmlFor="forSale">{t('new-travel-page.what-want')}</label>
							<select
								value={travel.forSale}
								onChange={handleChange}
								name="forSale"
								id="forSale"
								required
							>
								<option value={true}>
									{t('new-travel-page.publish-travel')}
								</option>
								<option value={false}>
									{t('new-travel-page.search-travel')}
								</option>
							</select>
							<label htmlFor="photo">{t('new-travel-page.upload-photo')}</label>
							<input
								onChange={handleChange}
								type="file"
								name="photo"
								id="photo"
							/>
							<button
								type="submit"
								disabled={isDisabled}
							>
								{t('new-travel-page.create-travel')}
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

export default NewTravelPage;
