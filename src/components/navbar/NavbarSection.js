import React from 'react';
import { Link } from 'react-router-dom';

function NavbarSection() {
  return (
    <nav className="navbar">
      <a id='byma-logo' href='/'>
        <img src='/images/logo-byma-fondos.png' alt='logo byma fondos'></img>
      </a>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarSection;
