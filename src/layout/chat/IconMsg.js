import { Link } from 'react-router-dom';

function IconMsg({ travelId }) {
	return (
		<div className="icon-msg">
			<Link to={`/travelChat/${travelId}`}>
				<button className="icon-msg__btn">
					<span>Contactar con el propietario ✉️</span>
				</button>
			</Link>
		</div>
	);
}

export default IconMsg;
