export function formatDate(datetimeCreation) {
	const dateObj = new Date(datetimeCreation);
	const day = dateObj.getDate();
	const month = dateObj.getMonth() + 1;
	const year = dateObj.getFullYear();
	return `${day}-${month}-${year}`;
}

export function formatDateTime(datetimeDeparture) {
	const fechaHora = new Date(datetimeDeparture);
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};

	return new Intl.DateTimeFormat('es-ES', options).format(fechaHora);
}
