import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ pageChange }) => {
  return (
    <div id="navbar">
      <img id="logoPic" src='https://c868finalproject.s3.us-east-2.amazonaws.com/Logo.JPG'></img>
      <button onClick={() => pageChange('login')}> My Account </button>
      <div className="hoursOfOperation">
        <div>
          <img src="https://c868finalproject.s3.us-east-2.amazonaws.com/clock.svg"></img>
          <h3>Hours of Operation</h3>
        </div>
        <div>
          <h4><b>Library Hours</b></h4>
          <h4> 10:00 AM - 5:00 PM</h4>
        </div>
        <div>
          <h4><b>Support Hours</b></h4>
          <h4> 8:00 AM - 7:00 PM</h4>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
