import React from 'react'
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

async function getIp()
{
    var data = await axios.get("https://www.cloudflare.com/cdn-cgi/trace")
      .then(response=> {
          return response.data;
      })
    return (data.split('\n')[2].split('=')[1]);
}
async function createAccountold(user, psw)
{
    var form = {
        username : user,
        password : psw
    };
    var ip = await getIp();
    var headers = {
        "X-Real-Ip" : ip,
        "X-Forwarded-For": ip,
        "content-type": "application/json"
    }
    console.log(typeof form)
    console.log(headers);
    fetch('http://localhost:8080/createAccount',{
        method: 'post',
        body: {
            username: user,
            password: psw
        },
        headers: headers
    })
    .then(results => results.json())
    .then(console.log)
 

}

function createAccount(user, psw)
{
    fetch('http://localhost:8080/createAccount', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'sobihanduturfu', password: 'motdepassemdr'})
    }).then(res=>res.json())
    .then(res => console.log(res));
}

async function createAccountoled(user, psw)
{
    var form = {
        'username': user,
        'password': psw
    };
    var ip = await getIp();
    var http = new XMLHttpRequest();
    var url = 'http://localhost:8080/createAccount'
    http.open('POST', url);
    http.setRequestHeader('Content-Type', 'application/json')
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(JSON.stringify(form));
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
        alert("LOGIN")

        window.isLogin = true
        ReactDOM.render(<App/>,  document.getElementById('root'))
        event.preventDefault();
    }
    responseGoogle(response) {
        this.setState({user:response["profileObj"],isGoogle:true})
        console.log(this.state.user)
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