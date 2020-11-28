import React from 'react';
import App from './App'
import ReactDOM from 'react-dom'
import {parseJson} from './Dashboard'


function getPlaceholder(value)
{
    if (value === 'city_temparature' || value === 'city_humidiy'){
        return( 'Exemple: Paris')
    }
    if (value === 'twitter profil' || value === 'twitter likes') {
        return ('twitterID')
    }
    if (value === 'country news'){
        return ('Exemple: US/FR')
    }
    if (value === 'subjet news') {
        return ('bitcoin')
    }
}

function getDescription(widget)
{
    switch(widget){
        case 'city_temparature':
            return 'Display temperature for a city'
        case 'city_humidiy':
            return 'Display the humidiy for a city'
        case 'twitter profil':
            return 'Display last tweets of a user'
        case 'twitter likes':
            return 'Display last likes of a user'
        case 'country news':
            return 'Display a news about a country'
        case 'subjet news':
            return 'Display a news about a subject'
        default:
            return ''
    }
}

function setConfig(usr)
{
    fetch('http://localhost:8080/setConfig', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: usr, data: window.widgets})
    }).then(res => res.json())
    .then(res => console.log(res))
}


function addWidgets(service, widget, config)
{
    var index = 0
    if (service === 'weather'){
        index = 0;
    } else if (service === 'twitter') {
        index = 1;
    } else {
        index = 2;
    }

    var data = {
        name: widget,
        description: getDescription(widget),
        params: {
            name: config,
            type: 'string'
        }
    }
    window.widgets['server']['services'][index]['widgets'].push(data);
    setConfig(window.user);
    parseJson();
}

export default class Config extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            serviceName:'',
            optName: 'none',
            config: 'none'

        }
        this.handleService = this.handleService.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleConfig = this.handleConfig.bind(this);
        this.handleSubbmit = this.handleSubbmit.bind(this);
    }
    handleService(event)
    {
        this.setState({serviceName: event.target.value})
    }
    handleOption(event)
    {
        this.setState({optName: event.target.value})
    }
    handleConfig(event)
    {
        this.setState({config: event.target.value})
    }
    handleSubbmit(event)
    {
        console.log(this.state)
        addWidgets(this.state.serviceName, this.state.optName, this.state.config)
        event.preventDefault();
        this.forceUpdate();
        ReactDOM.render(<App/>,  document.getElementById('root'));

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubbmit}>
                <select name="service" onChange={this.handleService}> 
                    <option value="">--Services--</option>
                    <option value="weather">meteo</option>
                    <option value="news">news</option>
                    <option value="twitter">twitter</option>
                </select>
                
            {
                this.state.serviceName === 'weather'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="city_temparature">Temperature</option>
                        <option value="city_humidiy">humidite</option>
                    </select>
                : console.log('')
            }
            {
                this.state.serviceName === 'news'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="country news">pays</option>
                        <option value="subjet news">sujet</option>
                    </select>
                : console.log('')
            }
            {
                this.state.serviceName === 'twitter'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="twitter profil">profil</option>
                        <option value="twitter likes">like</option>
                    </select>
                : console.log('')
            }
            {
                this.state.optName !== 'none'
                ?
                <input type="text" placeholder={getPlaceholder(this.state.optName)} onChange={this.handleConfig}></input>
                : console.log('')
            }
            {
                this.state.optName !== 'none'
                ?
                <input type="submit" value="Creer"></input>
                :console.log('')
            }
            </form>
            </div>
        )
    }
}