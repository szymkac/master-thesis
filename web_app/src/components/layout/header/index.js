import React from 'react';
import './header.scss';

const MenuButton = ({ onClick }) => (
    <div className="menu-button" onClick={onClick}>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
    </div>
);

//TODO convert classes to styled components
const Header = ({ onMenuOpenClick }) => (
    <div className="header-container">
        <MenuButton onClick={onMenuOpenClick} />
        <div className="logo-container">
        </div>
        <div className="menu-settings"></div>
    </div>
);

export default Header;