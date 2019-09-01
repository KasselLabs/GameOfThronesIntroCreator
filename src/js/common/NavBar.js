import React, { Component } from 'react';

import kasselLogo from '../../assets/img/KasselLabsLogo.png';

class NavBar extends Component {
  state = {
    showMenu: false,
  };

  _toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    const { showMenu } = this.state;

    const menu = (
      <ul className="menu">
        <li><a href="/#/">HOME</a></li>
        <li><a href="https://help.kassellabs.io/game-of-thrones/">CONTACT</a></li>
        <li>
          <a>ABOUT</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
          <ul className="dropdown">
            <li><a href="https://help.kassellabs.io/game-of-thrones/">FAQ</a></li>
            <li><a href="https://help.kassellabs.io/game-of-thrones/#termsOfService">TERMS OF SERVICE</a></li>
            <li><a href="https://help.kassellabs.io/privacy/">PRIVACY POLICY</a></li>
          </ul>
        </li>
        <li><a href="http://kassellabs.io">MORE APPS</a></li>
      </ul>);

    return (
      <nav className="navBar">
        <div className="content">
          <div className="kasselLogo">
            <a href="https://kassellabs.io">
              <img src={kasselLogo} alt="Kassel Labs" height="20" />
            </a>
          </div>
          <label htmlFor="show-menu" className="show-menu">
            <span />
            <span />
            <span />
            <input onChange={this._toggleMenu} type="checkbox" id="show-menu" role="button" />
          </label>
          {menu}
        </div>
        {showMenu && menu}
      </nav>
    );
  }
}

export default NavBar;
