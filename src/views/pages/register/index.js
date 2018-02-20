import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/login-form';

import { authActions } from 'src/core/auth';

class RegisterPage extends React.Component {
	render() {
		const dispatch = this.props.dispatch;
		const { formState, currentlySending } = this.props.data;
    return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Register</h2>
					</div>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Register" on the submit button */}
		    	<Form
            data={formState}
            dispatch={dispatch}
            location={location}
            history={this.props.history}
            onSubmit={::this._register}
            btnText={"Register"}
            currentlySending={currentlySending}
            />
				</div>
			</div>
		);
  }

	// Register a user
	_register(username, password) {
		this.props.dispatch(authActions.register(username, password));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state.home
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(RegisterPage);
