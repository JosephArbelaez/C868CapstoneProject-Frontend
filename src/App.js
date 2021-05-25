import React, {Component } from 'react';
import './App.css';

import Page from './components/Page/Page';


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
          
          <Page page = {page} pageChange={this.pageChange}/>
          
          </div>
      </div>
    );
  }
}


export default App;
