import React from 'react'
import GoogleLogin from 'react-google-login';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isGoogle: false,
            user : {}
        }
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.failureGoogle = this.failureGoogle.bind(this);
    };
    changeEmail(event) {
        this.setState({email:event.target.value})
    }
    changePassword(event) {
        this.setState({password:event.target.value})
    }
    handleSubmit(event) {
        alert("Todo")
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
    render() {
        return (        
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
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