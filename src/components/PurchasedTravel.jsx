import videoBackgroundPurchasedTravel from '../assets/video/video-background-purchased-travel.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './componentTravels.css';

const PurchasedTravel = () => {
	const navigate = useNavigate();
	const handleReturn = () => {
		return navigate('/travels');
	};
	const { t } = useTranslation();
	return (
		<div className="purchased-travel">
			<video
				className="video-background-purchased-travel"
				autoPlay
				muted
				loop
			>
				<source
					src={videoBackgroundPurchasedTravel}
					type="video/mp4"
				/>
			</video>
			<div className="icon-purchased">
				<div className="tick-purchased">✔</div>
			</div>
			<h1>{t('travel_purchased.congrats')}</h1>
			<p>{t('travel_purchased.success')}</p>
			<button onClick={handleReturn}>
				{t('travel_purchased.keep-navigation')}
			</button>
		</div>
	);
};

export default PurchasedTravel;
