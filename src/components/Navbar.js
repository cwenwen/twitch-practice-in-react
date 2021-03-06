import PropTypes from 'prop-types';
import React from 'react';

const NavItem = props => {
  const { navs, currentTab, onChange, gameOrder } = props;
  return (
    <li className={currentTab === gameOrder ? 'nav-item active' : 'nav-item'}>
      <a onClick={() => onChange(gameOrder)} className="nav-link" href="#">
        {navs[gameOrder]}
      </a>
    </li>
  );
};

const Navbar = props => {
  const { navs, currentTab, onChange } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a
        className="navbar-brand"
        href="https://cwenwen.github.io/twitch-practice-in-react/"
      >
        Twitch Live Games
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {[0, 1, 2, 3, 4].map(gameOrder => {
            return (
              <NavItem
                navs={navs}
                currentTab={currentTab}
                onChange={onChange}
                gameOrder={gameOrder}
                key={gameOrder}
              />
            );
          })}
        </ul>
        <span className="navbar-text text-light">
          Top 5 popular games on Twitch <mark className="bg-light">NOW</mark>
        </span>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  navs: PropTypes.array,
  currentTab: PropTypes.number,
  onChange: PropTypes.func,
};

NavItem.propTypes = {
  navs: PropTypes.array,
  currentTab: PropTypes.number,
  onChange: PropTypes.func,
  gameOrder: PropTypes.number,
};

export default Navbar;
