import React from 'react';
import Login from './login'
import {Temperature, Humidity} from './Meteo'
import ReactDOM from 'react-dom'
import {NewsCountry, NewsSubject} from './News'
import {GetProfile, Likes} from './Twitter'

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
          <Likes profileName='PSG_inside'/>
      )
    } else {
      return (
        <NewsSubject Subject='bitcoin'/>
      )}
  }
}