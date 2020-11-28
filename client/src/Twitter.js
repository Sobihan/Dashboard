import React from 'react'
import { Timeline, Hashtag } from 'react-twitter-widgets'

export class GetProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            profileName: props['profileName']
        }
    }
    render(){
        return(
            <div>
                <Timeline
                    dataSource={{
                        sourceType: 'profile',
                        screenName: this.state.profileName
                    }}
                    options={{ theme: "dark", width: "400", height: "600" }}
                    renderError={(_err) => <p>Error</p>}
                    />
            </div>
        )
    }
}

export class Likes extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            profileName: props['profileName']
        }
    }
    render(){
        return(
            <div>
                <Timeline
                    dataSource={{
                        sourceType: 'likes',
                        screenName: this.state.profileName
                    }}
                    options={{ theme: "dark", width: "400", height: "600" }}
                    renderError={(_err) => <p>Error</p>}
                    />
            </div>
        )
    }
}