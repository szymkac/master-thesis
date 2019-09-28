import React, { Component } from 'react';
import './layout.scss';
import Menu from './menu';
import Content from './content';


class Layout extends Component {
    content = React.createRef();
    onMenuOpenClick = () => {
      document.querySelector('#st-container').classList.add("st-effect");
      document.querySelector('#st-container').classList.add("st-menu-open");
    }
    onMenuCloseClick = () => {
      document.querySelector('#st-container').classList.remove("st-menu-open");
    }
    onMenuTileClick = (v) => {
      this.content.current.onMenuCloseClick();
    }
    render() {
      return (
        <div id="st-container" className="st-container">
          <Menu onMenuTileClick={this.onMenuTileClick}/>
          <Content ref={this.content} onMenuOpenClick={this.onMenuOpenClick} onMenuCloseClick={this.onMenuCloseClick}>
            {this.props.children}
          </Content>
        </div>
      );
    }
  }


export default Layout;