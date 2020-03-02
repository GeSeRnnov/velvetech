export const getMaxId = (list) => {
	let maxId = 0;
	if (list.length) {
		list.forEach( item => {
			if (item.id > maxId) maxId = item.id;
		});
		maxId++;
	}
	return maxId;
}

export const getObject = (list, id) => list.find(item => item.id === +id);
export const getId = (list, id) => list.findIndex(item => item.id === +id);

export const checkParams = (params) => {
	const nameLength = params.name.length;
	const price = params.price
	const today = new Date();
	const dateArray = params.selfLife.split('.');
	const selfLife = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);

	const isPriceOk = (price && !isNaN(price) && price > 0) || false;
	const isNameOk = (nameLength && (nameLength >= 5 && nameLength <= 40)) || false;
	const isSelfLifeOk = (dateArray && (selfLife - today) > 0) || false;
	return isPriceOk && isNameOk && isSelfLifeOk;
}