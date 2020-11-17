import React from 'react';

import {Text, SafeAreaView, StyleSheet } from 'react-native'
import * as Google from 'expo-google-app-auth';
import {Form, Input, Item, Button, Label} from 'native-base'
import Expo from 'expo';
import {logIn, signUp, signInWithGoogle} from './Fetch'

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isGoogle: false,
            email: '',
            password: ''
        }
    };
    async signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            androidClientId: '97814789611-pim8e5dmnc1g406139s5423phae13d98.apps.googleusercontent.com',
            iosClientId: '97814789611-a64nu2bdm2k4nstcs1nup64e6kg2h42e.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
          if (result.type === 'success') {
            this.setState({user: result['user']});
            this.setState({isGoogle: true});
            alert("Need url")
           // signInWithGoogle(this.state)
            return result['user'];
          } else {
            return { cancelled: true };
          }
        } catch (e) {
            console.log(e);
          return { error: true };
        }
        };
    async logIn() {
        alert("Log in, TODO");
        console.log(this.state["email"], this.state["password"])
        // logIn(this.state);
        // TODO
    };

    async signUp() {
        alert("Signup, TODO");
        if (this.state.password.length < 6) {
          alert('Password < 6');
        }
       // signUp(this.state);
        //TODO
    };
    render() {
  return (
      <SafeAreaView style={styles.container}>
          <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({email:email})}
                />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(password) => this.setState({password:password})}
                />
              </Item>
              <Button style={styles.button}
                full
                rounded
                success
                onPress={this.logIn.bind(this)}
                >
                    <Text style= {styles.text}>Login</Text>
                </Button>
                <Button style={styles.button}
                full
                rounded
                primary
                onPress={this.signUp.bind(this)}
                >
                    <Text style= {styles.text}>Signup</Text>
                </Button>
                <Button style={{backgroundColor: 'red', marginTop: 10}}
                    full
                    rounded
                    onPress={this.signInWithGoogleAsync.bind(this)}
                    >
                    <Text style= {styles.text}>Google</Text>
                </Button>
          </Form>
      </SafeAreaView>
  );
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10
    },
    button: {
      marginTop: 10
    },
    text: {
      color: 'white'
    }
  });