import React from 'react';


function getPlaceholder(value)
{
    if (value == 'temperature' || value == 'humidity'){
        return( 'Exemple: Paris')
    }
    if (value == 'profil' || value == 'likes') {
        return ('twitterID')
    }
    if (value == 'pays'){
        return ('Exemple: US/FR')
    }
    if (value == 'sujet') {
        return ('bitcoin')
    }
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
        alert('ON DOIT REQUETE ICIii');
        console.log(this.state)
        var data = {"widget": this.state.optName, "config": this.state.config};
        window.widgets["widgets"].push(data);
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubbmit}>
                <select name="service" onChange={this.handleService}> 
                    <option value="">--Services--</option>
                    <option value="meteo">meteo</option>
                    <option value="news">news</option>
                    <option value="twitter">twitter</option>
                </select>
                
            {
                this.state.serviceName == 'meteo'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">humidite</option>
                    </select>
                : console.log('')
            }
            {
                this.state.serviceName == 'news'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="country news">pays</option>
                        <option value="subjet news">sujet</option>
                    </select>
                : console.log('')
            }
            {
                this.state.serviceName == 'twitter'
                ?
                    <select name="option" onChange={this.handleOption}>
                        <option value="">--Options--</option>
                        <option value="twitter profil">profil</option>
                        <option value="twitter likes">like</option>
                    </select>
                : console.log('')
            }
            {
                this.state.optName != 'none'
                ?
                <input type="text" placeholder={getPlaceholder(this.state.optName)} onChange={this.handleConfig}></input>
                : console.log('')
            }
            {
                this.state.optName != 'none'
                ?
                <input type="submit" value="Creer"></input>
                :console.log('')
            }
            </form>
            </div>
        )
    }
}