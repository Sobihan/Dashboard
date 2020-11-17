import React from 'react';
import {Text, SafeAreaView, StyleSheet } from 'react-native'


export class Temperature extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            city: 'Paris',
            temp: 0
        }
        this.fetchWeather()
    };
    fetchWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=3a54eff05f3c1e8bcd40823ccee88f63`)
        .then(res=> res.json())
        .then(json=> {
            console.log(json)
            this.setState({temp:json["main"]["temp"] - 273.1})
        })
    }
    render() {
    return (
        <SafeAreaView>
            <Text>
                {/* {this.fetchWeather()} */}
                Température = 
                {this.state.temp}
            </Text>
        </SafeAreaView>
    );
    }
}


export class Humidity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            city: 'Paris',
            humidity: 0
        }
        this.fetchWeather()
    };
    fetchWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=3a54eff05f3c1e8bcd40823ccee88f63`)
        .then(res=> res.json())
        .then(json=> {
            console.log(json)
            this.setState({humidity:json["main"]["humidity"] - 273.1})
        })
    }
    render() {
    return (
        <SafeAreaView>
            <Text>
                {/* {this.fetchWeather()} */}
                Humidity = 
                {this.state.humidity}
            </Text>
        </SafeAreaView>
    );
    }
}