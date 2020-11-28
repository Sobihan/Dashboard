import React from 'react';
import {Temperature, Humidity} from './Meteo'
import {unmountComponentAtNode} from 'react-dom'
import {NewsCountry, NewsSubject} from './News'
import {GetProfile, Likes} from './Twitter'
import Config from './Config'

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

async function removeWidget(service, id)
{
    var index = 0;
    if (service === 'weather'){
        index = 0;
    } else if (service === 'twitter') {
        index = 1;
    } else {
        index = 2;
    }
    window.widgets['server']['services'][index]['widgets'].splice(id, 1);
    setConfig(window.user);
    parseJson();
}

export function parseJson()
{
    var component;
    window.component = [];
    var weathers = window.widgets['server']['services'][0]['widgets'];
    var twitters = window.widgets['server']['services'][1]['widgets'];
    var news = window.widgets['server']['services'][2]['widgets'];
    if (weathers === [] && twitters === [] && news === [])
        return (window.component);
    
    for (let i = 0; i < weathers.length; i++) {
        if (weathers[i]["name"] === "city_temparature"){
            component = <div>
                <button onClick={() => removeWidget('weather', i)}
                >SUPPRIMER</button>
                <Temperature city={weathers[i]["params"]["name"]}/>
            </div>
        } else if (weathers[i]["name"] === "city_humidiy"){
            component = <div>
                <button onClick={() => removeWidget('weather', i)}
                >SUPPRIMER</button>
                <Humidity city={weathers[i]["params"]["name"]}/>
            </div>
        }
        window.component.push(component);
    }

    for (let i = 0; i < twitters.length; i++) {
        if (twitters[i]["name"] === "twitter profil") {
            component = <div>
                 <button onClick={() => removeWidget('twitter', i)}
                >SUPPRIMER</button>
                <GetProfile profileName={twitters[i]["params"]["name"]}/>
            </div>
        } else if (twitters[i]["name"] === "twitter likes") {
            component = <div>
                <button onClick={() => removeWidget('twitter', i)}
                >SUPPRIMER</button>
                <Likes profileName={twitters[i]["params"]["name"]}/>
            </div>
        }
        window.component.push(component);
    }

    for (let i = 0; i < news.length; i++) {
        if (news[i]["name"] === "country news"){
            component = <div>
                <button onClick={() => removeWidget('news', i)}
                >SUPPRIMER</button>
                <NewsCountry Country={news[i]["params"]["name"]}/>
                </div>
        } else if (news[i]["name"] === "subjet news") {
            component = <div>
                 <button onClick={() => removeWidget('news', i)}
                >SUPPRIMER</button>
                <NewsSubject Subject={news[i]["params"]["name"]}/>
            </div>
        }
        window.component.push(component);
    }

    return (window.component);
}

export default class Dashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.parser = this.parser.bind(this);
        parseJson();
    }
    parser(){
        parseJson();
        this.forceUpdate();
    }
     componentDidMount(){
        unmountComponentAtNode(document.getElementById('widgets'));
        setInterval(this.parser, 10000);
    }
    render() {
        return (
            <div>
                <Config/>
                <div id="widgets">
                {
                    window.component
                }
                </div>
            </div>
        )
    }
}