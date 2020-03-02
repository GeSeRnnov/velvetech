import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, Save, Delete } from '@material-ui/icons';
import { serverSynchro } from '../server/server';

const CategoryRow = (category) => {
	const {row} = category;
	const [isEditMode, editModeToggler] = useState(false);
	const [changedCategory, onChangeCathegory] = useState(row.name || '');
	const dispatch = useDispatch();

	return <div className='category-row'>
		{
			isEditMode ?
			<input 
				type='text'
				className='add-input'
				value={changedCategory} 
				onChange={(e) => onChangeCathegory(e.target.value)}
			/> :
			<span className='category-name'>
				{`${row.name || ''}`}
			</span>
		}
		<div>
			{
				isEditMode ?
				<Save 
					className='category-icon'
					onClick={() => {
						serverSynchro({ 
							params: {
								type: 'edit-category', 
								changed: {
									id: row.id,
									name: changedCategory,
								},
							},
							dispatch,
						});
						editModeToggler(!isEditMode)
					}}
				/> :
				<Edit 
					className='category-icon'
					onClick={() => editModeToggler(!isEditMode)}
				/> 
			}
			<Delete 
				className='category-icon'
				onClick={() => 
					serverSynchro({ 
						params: {
							type: 'delete-category', 
							id: row.id,
						},
						dispatch,
					})
				}
			/>
		</div>
	</div>
}

export default CategoryRow;
