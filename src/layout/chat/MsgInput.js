import React, { useState } from 'react';

const MsgInput = ({ onSendMessage }) => {
	const [message, setMessage] = useState('');

	const handleMessageChange = e => {
		setMessage(e.target.value);
	};

	const handleSubmit = () => {
		if (message.trim() !== '') {
			onSendMessage(message);
			setMessage('');
		}
	};

	return (
		<div className="input-group mb-3">
			<input
				type="text"
				className="form-control"
				placeholder="Escribe tu mensaje..."
				value={message}
				onChange={handleMessageChange}
			/>
			<div className="input-group-append">
				<button
					className="btn btn-primary"
					type="button"
					onClick={handleSubmit}
				>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default MsgInput;
