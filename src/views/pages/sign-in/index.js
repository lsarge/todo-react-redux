import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/login-form';
import { authActions } from 'src/core/auth';


class SignIn extends React.Component {
  _login(username, password) {
		this.props.dispatch(authActions.login(username, password));
	}

  _register(username, password) {
		this.props.dispatch(authActions.register(username, password));
	}

  render() {

    const dispatch = this.props.dispatch;
    const { formState, currentlySending } = this.props.data;

    return (
      <div className="form-page__wrapper">
        <div className="form-page__form-wrapper">
          <div className="form-page__form-header">
            <h2 className="form-page__form-heading">Sign In</h2>
          </div>
          <Form
            data={formState}
            dispatch={dispatch}
            location={location}
            history={this.props.history}
            onSubmit={::this._login}
            btnText={"Login"}
            currentlySending={currentlySending}
            />
        </div>
      </div>
      );
    }
}

// SignIn.propTypes = {
//   signInWithGithub: PropTypes.func.isRequired,
//   signInWithGoogle: PropTypes.func.isRequired,
//   signInWithTwitter: PropTypes.func.isRequired
// };


function select(state) {
  return {
    data: state.auth
  };
}


//=====================================
//  CONNECT
//-------------------------------------

export default connect(select)(SignIn);
