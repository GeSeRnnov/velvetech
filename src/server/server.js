import reducers from '../store/reducers';

export const initBackend = (params) => {
	if (!localStorage.backDB) {
		const initialState = JSON.stringify({
			authorized: false,
			categoriesList: [],
			productsList: [],
		})
		localStorage.setItem('backDB', initialState);
	}
	return JSON.parse(localStorage.backDB);
}

export const authorize = (params) => {
	const backData = JSON.parse(localStorage.backDB);
	backData.authorized = true;
	localStorage.backDB = JSON.stringify(backData);
	const resp = Object.assign({}, params, { authorized: true });
	return resp;
};

const changeLocalStoreAsync = (params) => {
	return new Promise(resolve => {
		const backData = JSON.parse(localStorage.backDB);
		const newBackData = reducers(backData, params);
		localStorage.backDB = JSON.stringify(newBackData);
		resolve(newBackData);
	})
}

export const serverSynchro = (paramsDispatch) => {
	const { params, dispatch } = paramsDispatch;
	const changeLocalStore = changeLocalStoreAsync(params);
	changeLocalStore
	 	.then(res => {
	 		dispatch(params);
	 	})
	 	.catch(err => console.log('Err: ', err));
 	return params;
}


