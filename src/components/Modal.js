import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authorize } from '../server/server'

function Modal(props) {
	const {
		hasModal = false,
		toggleModal,
		Component = false,
	} = props;
	const dispatch = useDispatch();
	const [login, changeLogin] = useState('');
	const [password, changePassword] = useState('');

	return (
		<div>
			{ hasModal ? 
				!Component ?
					<div>
						<div className="modal-overlay"></div>
						<div className="modal-wrapper" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Plase log in</h5>
									<button className="close">
										<span onClick={() => toggleModal(!hasModal)}>&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label htmlFor="recipient-name" className="col-form-label">Login:</label>
											<input 
												type="text" 
												className="form-control" 
												onChange={e => changeLogin(e.target.value)} 
											/>
										</div>
										<div className="form-group">
											<label htmlFor="message-text" className="col-form-label">Password:</label>
											<input 
												className="form-control" 
												type="password" 
												onChange={e => changePassword(e.target.value)}
											/>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<button 
										type="button" 
										className="btn btn-secondary"
										onClick={() => toggleModal(!hasModal)}
									>
										Close
									</button>
									<button 
										type="button" 
										className="btn btn-primary"
										onClick={
											() => {
    											const params = { 
    												type: 'authorize',
    												login,
    												password,
    												authorized: true,
												};
												dispatch(authorize(params));
												toggleModal(!hasModal);
											}
										}
									>
										Ok
									</button>
								</div>
							</div>
						</div>
					</div> : 
					<div>
						<div className="modal-overlay"></div>
						<div className="modal-wrapper" role="document">
							<div className="modal-content">
								{Component} 
							</div>
						</div>
					</div> 
				: ''
			}
		</div> 
	);
}

export default Modal;
