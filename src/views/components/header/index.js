import React, { PropTypes } from 'react';


const Header = ({authenticated, signOut}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <ul className="header__actions">
            {authenticated ? <li><button className="btn" onClick={signOut}>Sign out</button></li> : null}
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
