import { getMaxId, getObject, getId } from '../../helpers/helpers';

const initialState = {
	authorized: false,
	categoriesList: [],
	productsList: [],
}

export default (state = initialState, action) => {
	let clone = Object.assign({}, state);
	const categories = Object.assign([], clone.categoriesList);
	const products = Object.assign([], clone.productsList);
	switch (action.type) {
		case 'init-fetch':
			const {type, ...rest} = action;
			clone = rest.state;
			return clone;
		case 'authorize':
			clone.authorized = action.authorized;
			return clone;
		case 'edit-category':
			const changed = action.changed;
			const categoryToChange = getObject(categories, changed.id);
			categoryToChange.name = changed.name;
			products.forEach(product => {
				if (+product.categoryId === +changed.id) {
					product.categoryName = changed.name;
				}
			});
			clone.categoriesList = categories;
			clone.productsList = products;
			return clone;
		case 'add-new-category':
			const name = action.name;
			const categoryId = getMaxId(categories);
			const newCategory = {
				id: +categoryId,
				name,
			}
			categories.push(newCategory);
			clone.categoriesList = categories;
			return clone;
		case 'delete-category':
			const categoryIdToDelete = getId(categories, action.id);
			categories.splice(categoryIdToDelete, 1);
			if (categories.length) {
				const categoryZeroId = getObject(categories, 0);
				products.forEach(product => {
					if (+product.categoryId === +action.id) {
						product.categoryId = 0;
						product.categoryName = (categoryZeroId && categoryZeroId.name) || 'None';
					}
				});
			}
			clone.categoriesList = categories;
			return clone;
		case 'add-product':
			const newProductData = action.productToSave;
			const productCategory = getObject(categories, newProductData.categoryId);
			const productId = getMaxId(products);
			const newProduct = Object.assign({}, 
				{...newProductData}, 
				{id: +productId},
				{categoryName: productCategory.name}
			);
			products.push(newProduct);
			clone.productsList = products;
			return clone;
		case 'edit-product':
			const editedProductData = action.productToSave;
			const productToChangeId = getId(products, editedProductData.id);
			const productToChange = products[productToChangeId];
			if (editedProductData.categoryId !== productToChange.categoryId) {
				const editedCategory = getObject(categories, editedProductData.categoryId);
				editedProductData.categoryName = editedCategory.name;
			}
			products[productToChangeId] = editedProductData;
			clone.productsList = products;
			return clone;
		case 'delete-product':
			const productIdToDelete = getId(products, action.id);
			products.splice(productIdToDelete, 1);
			clone.productsList = products;
			return clone;
		default:
			return clone;
	}
}
