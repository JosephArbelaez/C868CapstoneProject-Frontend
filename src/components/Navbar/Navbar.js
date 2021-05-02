import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ pageChange }) => {
  return (
    <div id="navbar">
      <img id="logoPic" src='https://c868finalproject.s3.us-east-2.amazonaws.com/Logo.JPG'></img>
      <button onClick={() => pageChange('login')}> My Account </button>
    </div>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
