import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryRow from './CategoryRow';
import { serverSynchro } from '../server/server';

function Categories() {
	const dispatch = useDispatch();
	const [newCategory, newCategoryChange] = useState('');
	const categoriesList = useSelector(state => state.categoriesList);

	return <div id="categories_wrapper">
		<div id="categories_rows">
			{
				categoriesList.map(category => <CategoryRow row={category} key={category.id}/>)
			}
		</div>
		<div id='add-container'>		
			<input 
				type='text'
				className='add-input'
				placeholder='Input new category' 
				onChange={(e) => {
					const value = e.target.value;
					newCategoryChange(value);
				}}
			/>
			<div
				className='div-button'
				onClick={() => {
					serverSynchro({ 
						params: {
							type: 'add-new-category', 
							name: newCategory 
						},
						dispatch,
					});
				}}
			>Add</div>
		</div>
	</div>
}

export default Categories;
