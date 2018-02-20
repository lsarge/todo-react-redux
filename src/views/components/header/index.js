import React, { PropTypes } from 'react';


const Header = () => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <ul className="header__actions">
            {<li><button className="btn" >Sign out</button></li>}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {

  signOut: PropTypes.func.isRequired
};

export default Header;
