import React from 'react';
import Login from './login'
import Dashboard from './Dashboard'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false,
    }
  };
  render() {
   
    return (
      <div id="root">
        {
          window.isLogin
          ? <Dashboard/>
          : <Login/>
        }
      </div>
    )
  }
}