import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Catalog from './components';
import 'bootstrap/dist/css/bootstrap.css';
import store from './store'

ReactDOM.render(
	<Provider store={store}>
		<Catalog />
	</Provider>
	, document.getElementById('root')
);
