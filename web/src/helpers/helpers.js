export function numToString(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function stringToNum(x) {
	return parseFloat(x.replace(/,/g, ''));
}
