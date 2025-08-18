import { setViewChat } from '../../api/serviceChat';
import { getUserId } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function TextChat({ messages, title, travelId }) {
	const userId = useSelector(getUserId);

	useEffect(() => {
		const fetchData = async () => {
			const data = { travelId, userId };
			await setViewChat(data);
		};
		fetchData();

		const intervalId = setInterval(() => {
			fetchData();
		}, 10000);

		return () => clearInterval(intervalId);
	}, [travelId, userId]);

	return (
		<div className="text-chat">
			<h4>{title}</h4>
			{messages ? (
				messages.map(message => (
					<div key={message.time}>
						<p
							className={` ${
								message.senderId === userId ? 'fw-bold text-left' : 'text-right'
							}`}
						>
							{message.text}
						</p>
					</div>
				))
			) : (
				<p>No messages.</p>
			)}
		</div>
	);
}

export default TextChat;
