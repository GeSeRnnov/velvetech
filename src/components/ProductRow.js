import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, Delete } from '@material-ui/icons';
import { TableRow, TableCell } from '@material-ui/core';
import Modal from './Modal';
import ProductModal from './ProductModal';
import { serverSynchro } from '../server/server';

const ProductRow = (product) => {
	const [hasModal, toggleModal] = useState(false);	
	const {row} = product;
	const dispatch = useDispatch();

	return <TableRow >
			<TableCell className='product-param'>{row.name}</TableCell>
			<TableCell className='product-param'>{row.price}</TableCell>
			<TableCell className='product-param'>{row.selfLife}</TableCell>
			<TableCell className='product-param'>{row.categoryName}</TableCell>
			<TableCell className='product-icon-cell'>
				<Edit 
					className='product-icon'
					onClick={() => toggleModal(!hasModal)}
				/> 
				<Modal 
					hasModal={hasModal}
					toggleModal={toggleModal}
					Component={
						<ProductModal
							rowData={row}
							hasModal={hasModal} 
							toggleModal={toggleModal}
						/>
					}
				/>
			</TableCell>
			<TableCell className='product-icon-cell'>
				<Delete 
					className='product-icon'
					onClick={() => 
						serverSynchro({ 
							params: {
								type: 'delete-product', 
								id: row.id,
							},
							dispatch,
						})
					}
				/>
			</TableCell>
		</TableRow>
}

export default ProductRow;
