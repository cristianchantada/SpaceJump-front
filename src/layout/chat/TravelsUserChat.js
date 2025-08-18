import { setTravelChat } from '../../api/serviceChat';
import { getTravel } from '../../api/serviceTravels';
import { getUserId } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MsgInput from './MsgInput';
import TextChat from './TextChat';

function TravelUserChat({ data, id }) {
	const [travelsData, setTravelsData] = useState(null);
	const [travelDataView, setTravelDataView] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [travelsExist, setTravelsExist] = useState(false);
	const [messages, setMessages] = useState([]);
	const userId = useSelector(getUserId);
	const [travelIdView, setTravelIdView] = useState(id);
	const [travelUserView, setTravelUserView] = useState('');
	const [messageView, setMessageView] = useState([]);
	const [msg, setMsg] = useState(data);
	const [idUserTo, setIdUserTo] = useState(null);
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTravelsData([]);

		const fetchData = async () => {
			try {
				const travelData = await getTravel(id);
				const dataN = ReviewTravelExistInMsg(data, id, travelData);
				setMsg(dataN);
				setTravelDataView(travelData);
				if (title === '') {
					setTitle(travelData?.topic.toUpperCase());
				}
				msg.forEach(message => {
					if (message.travelId === travelIdView) {
						setMessageView(message.travelchat);
						setTravelUserView(message.ownerId);
					}
				});
				setError(null);
			} catch (error) {
				setError(error.message);
			}
		};
		fetchData();
	}, [msg, travelIdView, id, data, title]);

	const resetError = () => {
		setError(null);
	};

	const handleSubmit = (event, travelId, message) => {
		event.preventDefault();

		setTravelIdView(travelId);
		setTravelUserView(message.ownerId);
		setTitle(message.travelName.toUpperCase());

		setMsg(UpdateMsgPending(travelId, msg));
	};

	const handleSendMessage = async message => {
		// Agregar el mensaje a la lista de mensajes

		setMessageView([
			...messageView,
			{ date: Date.now(), text: message, senderId: userId },
		]);
		const userTo = reviewUSerTo(messageView, userId, travelUserView);
		const data = {
			travelId: travelIdView,
			fromUserId: userId,
			toUserId: userTo,
			chatDatetime: Date.now(),
			chatText: message,
			readByUser: false,
		};

		await setTravelChat(data);
		setMsg(UpdateMsg(data, msg));
	};

	return (
		<div className="container">
			<>
				<div className="row">
					{/* Columna izquierda */}

					<div className="col-md-6">
						<div className="bg-light p-4">
							<h2>Travels</h2>
							<ul className="list-unstyled">
								{msg
									? msg.map(message => (
											<li key={message.travelId}>
												<button
													className={` ${
														message.travelId === travelIdView
															? 'fw-bold btn btn-primary btn-lg '
															: 'btn btn-secondary '
													}`}
													onClick={event =>
														handleSubmit(event, message.travelId, message)
													}
												>
													<span>{message.pending ? '🔔' : ''}</span>
													{message.travelName}
												</button>
											</li>
									  ))
									: null}
							</ul>
						</div>
					</div>

					{/* Columna derecha */}
					<div className="col-md-6">
						<div className="bg-info p-4">
							<h2>Messages</h2>
							<TextChat
								messages={messageView}
								title={title}
								travelId={travelIdView}
							/>

							<MsgInput onSendMessage={handleSendMessage} />
						</div>
					</div>
				</div>
			</>

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

export default TravelUserChat;

const ReviewTravelExistInMsg = (data, id, travelData) => {
	const dataN = data;
	let exist = false;

	data.forEach(travel => {
		if (travel.travelId === id) {
			exist = true;
		}
	});

	if (exist) {
		return data;
	}

	dataN.push({
		travelId: travelData._id,
		travelName: travelData.topic,
		ownerId: travelData.userId,
		ownerName: travelData.userName,
		travelchat: [],
	});

	return dataN;
};

const UpdateMsg = (data, msg) => {
	msg.forEach(travel => {
		if (travel.travelId === data.travelId) {
			travel.travelchat.push({
				date: data.chatDatetime,
				text: data.chatText,
				senderId: data.fromUserId,
				reciverId: data.toUserId,
			});
		}
	});

	return msg;
};

const reviewUSerTo = (messageView, userId, travelUserView) => {
	let userTo = null;

	if (messageView.length === 0) {
		userTo = travelUserView;
	} else {
		const message = messageView[0];

		if (message.length === 0) {
		} else {
			if (message?.senderId === userId) {
				userTo = message.receiverId;
			} else {
				userTo = message.senderId;
			}
		}
	}

	return userTo;
};

const UpdateMsgPending = (travelId, msg) => {
	msg.forEach(travel => {
		if (travel.travelId === travelId) {
			travel.pending = false;
		}
	});

	return msg;
};
