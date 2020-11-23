import React from 'react';
import Login from './login'
import {Temperature, Humidity} from './Meteo'
import ReactDOM from 'react-dom'
import {NewsCountry, NewsSubject} from './News'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false
    }
  };
  render() {
    if (this.state.isLogin == false) {
      return (
        <NewsSubject Subject='bitcoin'/>
      )
    } else {
      return (
      <div>
        connecte
      </div>
      )}
  }
}