import React, { useState } from 'react';
import Modal from './Modal'

function Menu(props) {
	const [hasModal, toggleModal] = useState(false);

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<ul className="navbar-nav ml-auto">
					<li className="navbar-item">
						<button 
							className=" btn btn-outline-success my-2 my-sm-0"
							onClick={() => toggleModal(!hasModal)}
							disabled={hasModal}
						>
							Log in
						</button>
					</li>
				</ul>
			</nav>
			<Modal
				hasModal={hasModal}
				toggleModal={toggleModal}
			/>
		</div>
	);
}

export default Menu;
