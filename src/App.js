import React, { useState, useEffect, Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Page from './components/Page/Page';
import Footer from './components/Footer/Footer';

const initialState = {
  page: "home"
}


class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  pageChange = (page) => {
    console.log(page);
    this.setState({page: page});
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <div className="App">
          <Navbar pageChange={this.pageChange}/>
          <Page page = {page} pageChange={this.pageChange}/>
          <Footer />
          </div>
      </div>
    );
  }
}


export default App;
