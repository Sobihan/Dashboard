import React from 'react';
import Login from './Components/Login/Login'
import {Temperature, Humidity} from './Components/Widgets/Meteo'
import {View} from 'react-native'

export default class App extends React.Component{
  render() {
  return (
      <View>
        <Temperature/>
        <Humidity/>
      </View>
  );
  }
}