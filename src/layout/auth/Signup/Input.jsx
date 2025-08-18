const Input = ({
	tiLabel,
	type,
	name,
	id,
	handleInput,
	placeholder,
	required,
	readOnly,
}) => {
	const handleChange = event => {
		handleInput(event);
	};
	return (
		<p className="text-white-50 mx-auto mt-2 mb-5">
			<label>
				{tiLabel}
				<br />
				<input
					placeholder={placeholder}
					type={type}
					name={name}
					id={id}
					required={required}
					onChange={handleChange}
					readOnly={readOnly}
				/>
			</label>
		</p>
	);
};

export default Input;
