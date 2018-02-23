import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({signOut, authenticated}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <ul className="header__actions">
            { authenticated ? <li><button className="btn" >Sign out</button></li> : null }
            { !authenticated ? <li><Link activeClassName="active" to={{pathname: '/register'}}>Register</Link></li> : null }
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
