export default function Filters(
	filterTravel,
	query,
	priceMax,
	priceMin,
	locationOrigin,
	locationDestination
) {
	filterTravel = filterTravel.filter(dato =>
		dato.topic.toLowerCase().includes(query.toLocaleLowerCase())
	);

	filterTravel = filterTravel.filter(
		advert => advert.price >= priceMin && advert.price <= priceMax
	);

	filterTravel = filterTravel.filter(origin =>
		origin.origin.includes(locationOrigin)
	);

	filterTravel = filterTravel.filter(destination =>
		destination.destination.includes(locationDestination)
	);

	return filterTravel;
}
