import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
import TextBox from '../components/TextBox';
import LoginButton from '../components/loginpage/LoginButton';
import UsernameBox from '../components/UsernameBox';
import UsernameLogin from '../components/loginpage/UsernameLogin'
import PasswordLogin from '../components/loginpage/PasswordLogin'
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";

export default class loginscreen extends Component {

  constructor(props) {
    super(props);
    Firebase.initialise();
    this.state = { username: "", password: "" };
  }
  static navigationOptions = {
    header: null
  };

  setUsername = (text) => {
    this.setState({ username: text });
  }

  setPassword = (text) => {
    this.setState({ password: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          proffer
        </Text>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../images/handshake.png')}
          />
        </View>
        <UsernameLogin changeTextFunc={this.setUsername} />
        <PasswordLogin changeTextFunc={this.setPassword} />

        <LoginButton
          title="Login"
          color="blue"
          username={this.state.username}
          password={this.state.password}
        />
        <View style={{alignItems:'center'}}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Register',{username:this.state.username,password:this.state.password })}>
          <View style={styles.signup}>
            <Text style={{ alignItems: 'center',textDecorationLine: 'underline', fontSize:20 }}>
              Sign up
              </Text>
          </View>
        </TouchableWithoutFeedback>
        </View>

        <Text style={styles.instructions}>
          Register using NUS email{'\n'}
          Proffer is an app for you to help others
        </Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'purple',
    fontFamily: 'monospace',
    textShadowOffset: { width: 4, height: 4 }
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 50,
    marginTop:10,
    marginBottom:10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop:20,
  },
});

