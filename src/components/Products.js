import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductRow from './ProductRow';
import { TableContainer, Table, TableBody, TableRow } from '@material-ui/core';
import { TableHead, TableCell, makeStyles } from '@material-ui/core';
import Modal from './Modal';
import ProductModal from './ProductModal'

const useStyles = makeStyles({
	tableContainer: {
		maxHeight: 'calc(70vh - 2.6em)',
	}
})

function Products(props) {
	const [hasModal, toggleModal] = useState(false);
	const productsList = useSelector(state => state.productsList);
	const classes = useStyles();

	return <div id='product-wrapper'>
	 	<TableContainer className={classes.tableContainer}>
			<Table stickyHeader aria-label='sticky-table'>
				<TableHead>
					<TableRow>
						<TableCell className='product-head'>Name</TableCell>
						<TableCell className='product-head'>Price</TableCell>
						<TableCell className='product-head'>Self Life</TableCell>
						<TableCell className='product-head'>Category</TableCell>
						<TableCell className='product-head'>Edit</TableCell>
						<TableCell className='product-head'>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody id='product-rows'>
					{
						productsList.map(product => <ProductRow row={product} key={product.id}/>)
					}
				</TableBody>
			</Table>
	 	</TableContainer>
		<div id='add-container'>		
			<div
				className='div-button'
				onClick={() => toggleModal(true)}
			>Add new</div>
		</div>
		<Modal 
			hasModal={hasModal}
			toggleModal={toggleModal}
			Component={
				<ProductModal
					hasModal={hasModal} 
					toggleModal={toggleModal}
				/>
			}
		/>
	</div>
}

export default Products;
