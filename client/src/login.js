import React from 'react'
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom'
import App from './App'


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

function reformat(usr)
{
    window.widgets['server']['services'][0]['widgets'] = []
    window.widgets['server']['services'][1]['widgets'] = []
    window.widgets['server']['services'][2]['widgets'] = []

    console.log(window.widgets);
    setConfig(usr);
}
function createAccount(user, psw)
{
    fetch('http://localhost:8080/createAccount', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user, password: psw})
    }).then(res=>res.json())
    .then(res => {
        console.log(res['answer'])
        if (res['answer'] != 'ok') {
            document.getElementById("error").innerHTML = res['answer'];
            return;
        } else {
            fetch('http://localhost:8080/about.json')
            .then(res=> res.json())
            .then(res => {
                window.widgets = res;
                reformat(user);
                window.isLogin = true;
                window.user = user;
                ReactDOM.render(<App/>,  document.getElementById('root'))
            })
        }
    });
}

function getConfig(user, isGoogle)
{
    fetch('http://localhost:8080/getConfig', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user})
    }).then(res => res.json())
    .then(res => {
        window.widgets = res;
        if (isGoogle == true) {
        try {
        if (res["server"]["services"][0]["widgets"][0]["params"][0]["name"] == "city") {
            reformat(user);
        }
        
        }catch(error)
        {
            console.log(error)
        }
    }
        window.isLogin = true;
        window.user = user;
        ReactDOM.render(<App/>,  document.getElementById('root'))
    })

}
function login(user, psw)
{
    fetch('http://localhost:8080/login',{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user, password: psw})
    }).then(res => res.json())
    .then(res => {
        console.log(res['answer'])
        if (res['answer'] != 'ok') {
            document.getElementById("error").innerHTML = res['answer'];
            return;
        } else {
            getConfig(user, false);
        }
    })
}

function logGoogle(usr)
{
    getConfig(usr, true);

}
export default class Login extends React.Component {
    constructor(props){ 
        super(props);
        this.state = {
            username: '',
            password: '',
            isGoogle: false,
            user : {}
        }
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.failureGoogle = this.failureGoogle.bind(this);
        this.signup = this.signup.bind(this);
    };
    changeEmail(event) {
        this.setState({username:event.target.value})
    }
    changePassword(event) {
        this.setState({password:event.target.value})
    }
    handleSubmit(event) {
        login(this.state.username, this.state.password);
        event.preventDefault();
    }
    responseGoogle(response) {
        this.setState({user:response["profileObj"],isGoogle:true})
        console.log(this.state.user['email'])
        logGoogle(this.state.user['email'])
    }
    failureGoogle(response) {
        console.log("Eroororrrr")
        console.log(response)
    }
    signup(event) {
        createAccount(this.state.username, this.state.password);
        event.preventDefault();
    }
    render() {
        return (        
        <div>
            <div id="error">

            </div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Usermane:
                    <input type="text" name="email" onChange={this.changeEmail}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password" onChange={this.changePassword}/>
                </label>
                <br/>
                <input type="submit" value="Login"/>
            </form>
            <form onSubmit={this.signup}>
                <input type="submit" value="Signup"/>
            </form>
            <br/>
            <GoogleLogin
            clientId="97814789611-7ud57c3jc8d0jjmh9b9puks1j8tvl30e.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={this.responseGoogle}
            onFailure={this.failureGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
        );
    }
}