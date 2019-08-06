import React, { Component } from 'react';
import Navigation from '../navigation';

class Menu extends Component {
    onMenuTileClick = () => {
        if (typeof this.props.onMenuTileClick === "function")
            this.props.onMenuTileClick();
    }
    render() {
        return (
            <nav className="st-menu st-effect">
                <Navigation onClick={this.onMenuTileClick}/>
            </nav>
        );
    }
}

export default Menu;