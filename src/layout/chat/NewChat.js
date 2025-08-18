import { setTravelChat } from '../../api/serviceChat';
import { getTravel } from '../../api/serviceTravels';
import { getUserId } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MsgInput from './MsgInput';

function NewChat({ id }) {
	const [travelsData, setTravelsData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [travelsExist, setTravelsExist] = useState(false);
	const [messages, setMessages] = useState([]);
	const userId = useSelector(getUserId);

	useEffect(() => {
		setTravelsData([]);
		const fetchData = async () => {
			try {
				const travel = await getTravel(id);
				setTravelsData(travel);
				if (travel?._id === id) {
					setTravelsExist(true);
				}
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();

		setIsLoading(true);
	}, [id]);

	const resetError = () => {
		setError(null);
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	const handleSendMessage = async message => {
		setMessages([...messages, message]);

		const data = {
			travelId: travelsData._id,
			fromUserId: userId,
			toUserId: travelsData.userId,
			chatDatetime: Date.now(),
			chatText: message,
			readByUser: false,
		};

		await setTravelChat(data);
	};

	return (
		<div className="container">
			{isLoading ? (
				<>
					{travelsExist ? (
						<div className="row">
							{/* Columna izquierda */}
							<div className="col-md-6">
								<div className="bg-light p-4">
									<h2>Travels</h2>
									<button onClick={handleSubmit}>{travelsData.topic}</button>
								</div>
							</div>

							{/* Columna derecha */}
							<div className="col-md-6">
								<div className="bg-info p-4">
									<h2>Messages</h2>

									{messages ? (
										messages.map(message => <p key={message}>{message}</p>)
									) : (
										<p>No messages.</p>
									)}
									<MsgInput onSendMessage={handleSendMessage} />
								</div>
							</div>
						</div>
					) : null}
				</>
			) : (
				<></>
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
		</div>
	);
}

export default NewChat;
