import React from 'react';
import { Link } from 'react-router-dom';

function NavbarSection() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/abm-gerentes">Abm Gerentes</Link></li>

      </ul>
    </nav>
  );
}

export default NavbarSection;
