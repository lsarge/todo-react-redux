import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from '../routes';
import Header from '../components/header';


export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.TASKS);
    }
  }

  render() {
    const { router } = this.context;
    console.log('router', router);
    const { path } = this.props;
    console.log('path', path);
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />
        <nav>
          <ul className="main-nav g-row nav-list">
            <li><Link activeClassName="active" to={{pathname: '/'}}>Tasks</Link></li>
            <li><Link activeClassName="active" to={{pathname: '/posts'}}>Posts</Link></li>
          </ul>
        </nav>

        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
