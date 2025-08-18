import { getTravelChat } from '../../api/serviceChat';
import NavUserPanel from '../userPanel/NavUserPanel';
import { getUserName } from '../../redux/selectors';
import Loading from '../utils/spinner/Loading';
import TravelUserChat from './TravelsUserChat';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NewChat from './NewChat';

function TravelChat() {
	const { id } = useParams();
	const user = useSelector(getUserName);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [chatTravelsData, setChatTravelsData] = useState([]);
	const [isMsg, setIsMsg] = useState(false);
	const [isId, setIsId] = useState(false);
	const [travelIdView, setTravelIdView] = useState(id);

	useEffect(() => {
		setChatTravelsData([]);
		const fetchData = async () => {
			const data = { user };
			try {
				const chatData = await getTravelChat(data, {
					headers: { 'content-type': 'multipart/form-data' },
				});

				if (chatData?.status === 400) {
					setError(chatData.message);
				}

				if (chatData?.status === 'KO') {
					setChatTravelsData(chatData.result);
					setIsMsg(false);
					setError(null);
				}

				if (chatData?.status === 'OK') {
					setChatTravelsData(chatData.result);
					setIsMsg(true);
					setError(null);

					if (id === '00') {
						setTravelIdView(chatData.result[0].travelId);
					}
				}

				setIsLoading(true);
				setError(null);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();

		if (id === '00') {
			setIsId(false);
		} else {
			setIsId(true);
		}
	}, [user, id]);

	const resetError = () => {
		setError(null);
	};

	useEffect(() => {
		const handleUpdateMsg = async () => {
			const data = { user };
			try {
				const chatData = await getTravelChat(data, {
					headers: { 'content-type': 'multipart/form-data' },
				});

				if (chatData?.status === 400) {
					setError(chatData.message);
				}

				if (chatData?.status === 'KO') {
					setChatTravelsData(chatData.result);
					setIsMsg(false);
					setError(null);
				}

				if (chatData?.status === 'OK') {
					setChatTravelsData(chatData.result);
					setIsMsg(true);
					setError(null);

					if (id === '00') {
						setTravelIdView(chatData.result[0].travelId);
					}
				}

				setIsLoading(true);
				setError(null);
			} catch (error) {
				setError(error.message);
			}
		};

		const intervalId = setInterval(() => {
			handleUpdateMsg();
		}, 10000);

		return () => clearInterval(intervalId);
	}, [id, user]);

	return (
		<NavUserPanel origin="chat">
			<>
				{isLoading ? (
					<div className="TravelChat">
						<h2 className="text-white">Travel Chat</h2>
						<button
							className="btn btn-primary mb-3"
						>Update Messages</button>
						{isMsg ? (
							<TravelUserChat
								data={chatTravelsData}
								id={travelIdView}
							/>
						) : (
							<>
								{isId ? (
									<NewChat id={id} />
								) : (
									<p className="text-white">No messages</p>
								)}
							</>
						)}
					</div>
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
			</>
		</NavUserPanel>
	);
}
export default TravelChat;
