import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ pageChange, loginText }) => {
  return (
    <div className="navbar">
        <a onClick={() => pageChange('home')}><img className="logo" src='https://c868finalproject.s3.us-east-2.amazonaws.com/logo.jpg'></img></a>
        <button className="loginButton" onClick={() => pageChange('login')}> <b>{loginText}</b></button>
      {/* <div className="navbarThirdColumn">
        <div className="hoursFirstRow">
          <img className="hoursClock"src="https://c868finalproject.s3.us-east-2.amazonaws.com/clock.svg"></img>
          <p><b>Hours of Operation</b></p>
        </div>
        <div className="hoursSecondRow">
          <p><b>Library Hours: </b> 10:00 AM - 5:00 PM</p>
        </div>
        <div className="hoursThirdRow">
          <p><b>Support Hours: </b> 8:00 AM - 7:00 PM</p>
        </div>
      </div>
      <div className="navbarThirdColumn">
            <h3>Library Location</h3>
            <h4>123 South Main Street</h4>
            <h4>555-555-5555</h4>
        </div> */}
    </div>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
