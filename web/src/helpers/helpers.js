export function numToString(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function stringToNum(x) {
	return parseFloat(x.replace(/,/g, ''));
}

export function formatFloat(x, decimals) {
	const y = Math.pow(10, decimals);
	return parseFloat(Math.round(x * y) / y).toFixed(decimals);
}

export const DefaultSchoolSearchParams = {
	__typename: 'SchoolSearchParams',
	pageNumber: 0,
	searchText: null,
	locationUUID: null,
	paymentType: null,
	maxPrice: null,
	minLength: null,
}
