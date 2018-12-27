import React, { Component } from 'react';

const Navbar = props => {
  const { navs, tab, onChange } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand">Twitch Live Games</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={tab === 0 ? "nav-item active": "nav-item"}>
            <a onClick={() => onChange(0)} className="nav-link" href="#">
              {navs[0]}
            </a>
          </li>
          <li className={tab === 1 ? "nav-item active": "nav-item"}>
            <a onClick={() => onChange(1)} className="nav-link" href="#">
              {navs[1]}
            </a>
          </li>
          <li className={tab === 2 ? "nav-item active": "nav-item"}>
            <a onClick={() => onChange(2)}  className="nav-link" href="#">
              {navs[2]}
            </a>
          </li>
          <li className={tab === 3 ? "nav-item active": "nav-item"}>
            <a onClick={() => onChange(3)} className="nav-link" href="#">
              {navs[3]}
            </a>
          </li>
          <li className={tab === 4 ? "nav-item active": "nav-item"}>
            <a onClick={() => onChange(4)} className="nav-link" href="#">
              {navs[4]}
            </a>
          </li>
        </ul>
        <span className="navbar-text text-light">
          Top 5 popular games on Twitch <mark className="bg-light">NOW</mark>
        </span>
      </div>
    </nav>
  );
}
 
export default Navbar;