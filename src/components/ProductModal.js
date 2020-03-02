import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { serverSynchro } from '../server/server';
import { checkParams } from '../helpers/helpers';

const ProductModal = (props) => {
	const { 
		toggleModal, 
		hasModal,
		rowData: {
			name: rowName = '',
			price: rowPrice = 0,
			selfLife: rowSelfLife = '',
			categoryId: rowCategoryId = 0,
			categoryName = '',			
		} = {},
	} = props;
	const dispatch = useDispatch();
	const [name, onChangeName] = useState(rowName);
	const [price, onChangePrice] = useState(rowPrice);
	const [selfLife, onChangeSelfLife] = useState(rowSelfLife);
	const [categoryId, onChangeCategoryId] = useState(rowCategoryId);
	const [isChecked, changeChecked] = useState(true);
	const categoriesList = useSelector(state => state.categoriesList);
	const dateArray = selfLife.split('.');
	const title = props.rowData ? 'Edit product' : 'Create new product';
	const selectedDate = selfLife ? 
		new Date(dateArray[2], dateArray[1] - 1, dateArray[0]) : 
		new Date();
	
	return <div>
		<div className="modal-header">
			<h5 className="modal-title">{title}</h5>
			<button className="close">
				<span onClick={() => toggleModal(!hasModal)}>&times;</span>
			</button>
		</div>
		{ Object.keys(categoriesList).length ? 
			<div className="modal-body">
				<div className="form-group">
					<label className="col-form-label">Name:</label>
					<input 
						type="text" 
						className="form-control" 
						value={name}
						onChange={e => onChangeName(e.target.value)} 
					/>
					{
						!isChecked ? <span className='warnings'>
							The name must be between 5 to 40 characters long.
						</span> : ''
					}
				</div>
				<div className="form-group">
					<label className="col-form-label">Price:</label>
					<input 
						type="text" 
						className="form-control" 
						value={price}
						onChange={e => onChangePrice(e.target.value)} 
					/>
					{
						!isChecked ? <span className='warnings'>
							The price should be more than zero.
						</span> : ''
					}
				</div>
				<div className="form-group">
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<label className="col-form-label">Self Life:</label><br/>
						<KeyboardDatePicker 
							format="dd.MM.yyyy"
							value={selectedDate}
							margin="normal"
							className={'my-0 w-100'}
							onChange={(date, value) => {
								onChangeSelfLife(value);
							}} 
							KeyboardButtonProps={{
					            'aria-label': 'change date',
					        }}
						/>
					</MuiPickersUtilsProvider>
					{
						!isChecked ? <span className='warnings'>
							The self life should be longer than today.
						</span> : ''
					}
				</div>
				<div className="form-group">
					<label className="col-form-label">categoryId:</label>
					<select 
						className="form-control" 
						value={categoryId}
						onChange={e => onChangeCategoryId(e.target.value)} 
					>
						{	
							categoriesList.length ? 
							categoriesList.map(category => <option 
								key={category.id} 
								value={category.id}
							>
								{category.name}
							</option>) :
							<option>None</option>
						}
					</select>
				</div>
			</div> :	
			<div className='text-center py-5'>
				You should fill at least 1 category.
			</div>
		}		
		<div className="modal-footer">
			<button 
				type="button" 
				className="btn btn-secondary"
				onClick={() => toggleModal(!hasModal)}
			>Close</button>
			{ Object.keys(categoriesList).length ? 
				<button 
					type="button" 
					className="btn btn-primary"
					onClick={ () => {
						const productToSave = Object.assign({}, 
							props.rowData, 
							{
								name,
								price,
								selfLife,
								categoryId,
								categoryName,
						})
						const checking = checkParams(productToSave);
						changeChecked(checking)
						if (checking) {
							let type = '';
							if (props.rowData) {
								type = 'edit-product';
								productToSave.id = props.rowData.id;
							} else {
								type = 'add-product';
							}
							serverSynchro({ 
								params: {
									type, 
									productToSave, 
								},
								dispatch,
							});
							toggleModal(!hasModal);
						}
					}}
				>Save</button> : ''
			}
		</div>
	</div>
}

export default ProductModal;
