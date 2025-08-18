import { setReadChat } from '../../api/serviceChat';
import { getUserId } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function IconHeaderMsg() {
	const userId = useSelector(getUserId);
	const [travelId, setTravelId] = useState('00');
	const [isMsg, setIsMsg] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = { userId };
				const result = await setReadChat(data);

				if (result.result.length === 0) {
					setIsMsg(false);
				} else {
					setIsMsg(true);
				}
			} catch (error) {}
		};

		fetchData();
	}, [travelId, userId]);

	const handelButton = () => {
		return navigate(`/travelChat/${travelId}`);
	};

	return (
		<div className="icon-msg">
			{isMsg ? (
				<button
					className='icon-msg__btn-bell'
					type="button"
					onClick={handelButton}
				>
					<span>🔔</span>
				</button>
			) : null}
		</div>
	);
}

export default IconHeaderMsg;
