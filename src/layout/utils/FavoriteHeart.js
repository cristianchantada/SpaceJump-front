import { getTravelById, getUserId } from '../../redux/selectors';
import { setTravelFavorite } from '../../api/serviceTravels';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteChange } from '../../redux/actions';
import React, { useState } from 'react';

function FavoriteHeart({ travelId, checked }) {
	const [isFavorite, setIsFavorite] = useState(checked);
	const userId = useSelector(getUserId);
	const travel = useSelector(getTravelById(travelId));
	const dispatch = useDispatch();

	const handleFavoriteChange = async newFavoriteState => {
		try {
			await setTravelFavorite(travelId, newFavoriteState);
			setIsFavorite(newFavoriteState); // Actualiza el estado local

			dispatch(favoriteChange(newFavoriteState, travel, travelId, userId));
		} catch (error) {
			console.error('Error al cambiar el estado favorito:', error);
		}
	};

	const toggleFavorite = () => {
		const newFavoriteState = !isFavorite;
		handleFavoriteChange(newFavoriteState);
	};

	return (
		<span
			className="fav-hearth"
			onClick={toggleFavorite}
		>
			{isFavorite ? 'Añadido a favoritos ❤️' : 'Añadir a favoritos 🤍'}
		</span>
	);
}

export default FavoriteHeart;
