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
    home: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { home } = this.props;

    if (home.loggedIn && !nextProps.home.loggedIn) {
      router.replace(paths.SIGN_IN);
    }
    else if (!home.loggedIn && nextProps.home.loggedIn) {
      router.replace(paths.POSTS);
    }
  }

  render() {
    const { router } = this.context;
    const { path } = this.props;
    return (
      <div>
        <Header
          authenticated={this.props.home.loggedIn}
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
  home => ({home})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
