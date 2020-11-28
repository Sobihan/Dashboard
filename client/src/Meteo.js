import React from 'react'

export class Temperature extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            city: props['city'],
            temperature: 0
        }
        this.fetchWeather();
    }
    fetchWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=3a54eff05f3c1e8bcd40823ccee88f63`)
        .then(res=> res.json())
        .then(json=> {
            console.log(json)
            if (json["cod"] == "404") {
                this.setState({temperature: 'null'})
            } else {
            this.setState({temperature:json["main"]["temp"] - 273.1})
            }
        })
    }
    render() {
        return (
            <div>
                Température à {' '}
                {this.state.city}{" => "}
                {this.state.temperature}°C
            </div>
        )
    }
}

export class Humidity extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            city: props['city'],
            humidity: 0
        }
        this.fetchWeather();
    }
    fetchWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=3a54eff05f3c1e8bcd40823ccee88f63`)
        .then(res=> res.json())
        .then(json=> {
            if (json["cod"] == "404") {
                this.setState({humidity: 'null'})
            } else {
                this.setState({humidity:json["main"]["humidity"]})
            }
        })
    }

    render() {

    const style = {
        color: 'white',
        background: 'dodgerblue'
    }
        return (
            <div style={style}>
                Humidité à {` ${this.state.city} => `}
                {this.state.humidity}
            </div>
        )
    }
}