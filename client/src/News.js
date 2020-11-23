import React from 'react'

export class NewsCountry extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            Country: props['Country'],
            Articles: [],
            Article: "",
            index: 0
        }
        this.fetchNews();
    }
    fetchNews()
    {
        fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.Country}&apiKey=b537029a9bcd40588d7275100d6e6642`)
        .then(res=> res.json())
        .then(json=> {
            this.setState({Articles:json["articles"]})
            var index = this.state.index + 1;
            console.log(json)
            console.log()
            this.setState({index:index})
            this.setState({Article: json["articles"][index]['content']})
        })
    }
    render() {
        return (
            <div>
                {this.state.Article}
            </div>
        )
    }
}

export class NewsSubject extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            Subject: props['Subject'],
            Articles: [],
            Article: "",
            index: 0
        }
        this.fetchNews();
    }
    fetchNews()
    {
        fetch(`https://newsapi.org/v2/everything?q=${this.state.Subject}&apiKey=b537029a9bcd40588d7275100d6e6642`)
        .then(res=> res.json())
        .then(json=> {
            this.setState({Articles:json["articles"]})
            var index = this.state.index + 1;
            console.log(json)
            console.log()
            this.setState({index:index})
            this.setState({Article: json["articles"][index]['content']})
        })
    }
    render() {
        return (
            <div>
                {this.state.Article}
            </div>
        )
    }
}