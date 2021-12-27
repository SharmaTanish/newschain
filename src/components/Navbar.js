import React, { Component } from 'react';
import Identicon from 'identicon.js';
import dvideo from '../dvideo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;Newschain
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <span id="account">{this.props.account}</span>
            </small>
              {
                this.props.account 
                ?
                <img
                className='ml-2'
                width = '30'
                height='30'
                src='https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
                alt='user-avatar'
                ></img>
                :
                <span></span>

              }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;