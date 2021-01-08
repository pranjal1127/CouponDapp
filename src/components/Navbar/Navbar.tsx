import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import ConnectWallet from "./ConnectWallet";
import { Link } from "react-router-dom";

export default class extends Component {
  render = () => (
    <>
      <header className="header_area menu_two header_style">
        <div className="header_menu">
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="transparent"
            className="bg-light survey-nav"
          >
            <a className="navbar-brand" href="/">
              <img
                className="main_logo"
                src="img/Coupondapp-logo.png"
                alt=""
                width="180"
              />
              <img
                className="mobile_logo"
                src="img/Coupondapp-logo-blue.png"
                width="230"
                alt=""
              />
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="nav navbar-nav ml-auto">
                <li>
                  <Link to="/" className="navbar-element ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/new" className="navbar-element ">
                    New Coupon
                  </Link>
                </li>
                <li>
                  <Link to="/redeem" className="navbar-element ">
                    Redeem Coupon
                  </Link>
                </li>

                <ConnectWallet />
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  );
}
