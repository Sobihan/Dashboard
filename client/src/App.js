import React from 'react';
import Login from './login'
import {Temperature, Humidity} from './Meteo'
import ReactDOM from 'react-dom'
import {NewsCountry, NewsSubject} from './News'
import {GetProfile, Likes} from './Twitter'
import Config from './Config'



function parseWidget()
{
  var widgets = [];
  for (let i = 0; i < window.widgets.widgets.length; i++) {
    if (window.widgets.widgets[i].widget == "temperature") {
      var component = <Temperature city={window.widgets.widgets[i].config}/>
    } else if (window.widgets.widgets[i].widget == "humidity"){
      var component = <Humidity city={window.widgets.widgets[i].config}/>
    } else if (window.widgets.widgets[i].widget == "twitter profil"){
      var component = <GetProfile profileName={window.widgets.widgets[i].config}/>
    } else if (window.widgets.widgets[i].widget == "twitter likes"){
      var component = <Likes profileName={window.widgets.widgets[i].config}/>
    } else if (window.widgets.widgets[i].widget == "country news"){
      var component = <NewsCountry Country={window.widgets.widgets[i].config}/>
    } else if (window.widgets.widgets[i].widget == "subjet news"){
      var component = <NewsSubject Subject={window.widgets.widgets[i].config}/>
    }
    widgets.push(component)
  }
  return (widgets);
}
export default class App extends React.Component {
  constructor(props) {
    window.widgets = {"widgets":[{"widget":"temperature","config":"paris"},{"widget":"temperature","config":"london"},{"widget":"subjet news","config":"bitcoin"}]}
    //window.isLogin = false
    super(props);
    this.state = {
      isLogin : false,
      widgets : parseWidget()
    }
  };
  render() {
    // if (window.isLogin == false) {
    //   return (
    //      <Login/>
    //        //<Likes profileName='PSG_inside'/>
    //   )
    // } else {
    //   return (
    //     <NewsSubject Subject='bitcoin'/>
    //   )}
    // return (
    //   <Likes profileName='PSG_inside'/>
    // )

    // return (
    //   <div>
    //     {
    //       this.state.widgets
    //     }
    //   </div>
    // )
    // return(
    //   <Config/>
    // )
    return (
      <div id="root">
        {
          window.isLogin
          ? <NewsSubject Subject='bitcoin'/>
          : <Login/>
        }
      </div>
    )
  }
}