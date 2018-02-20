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
      <div className="g-row sign-in">
        <Form
          data={formState}
          dispatch={dispatch}
          location={location}
          history={this.props.history}
          onSubmit={::this._login}
          btnText={"Login"}
          currentlySending={currentlySending}
          />

          <br />
          <br />
          <br />

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
      );
    }
}

// SignIn.propTypes = {
//   signInWithGithub: PropTypes.func.isRequired,
//   signInWithGoogle: PropTypes.func.isRequired,
//   signInWithTwitter: PropTypes.func.isRequired
// };


function select(state) {
  console.log('state in sing-in', state);
  return {
    data: state.home
  };
}


//=====================================
//  CONNECT
//-------------------------------------

export default connect(select)(SignIn);
