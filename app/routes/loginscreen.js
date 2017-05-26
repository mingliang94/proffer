import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button
} from 'react-native';
import TextBox from '../components/TextBox';
import LoginButton from '../components/LoginButton';
import UsernameBox from '../components/UsernameBox';
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';


export default class loginscreen extends Component {
  static navigationOptions = {
    header: null
  };

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
        <TextBox functionName='Username'/>
        <TextBox functionName='Password' />
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxHeight: 100
        }}>
          <LoginButton />
          <Button title="Register"
            color="powderblue"
            onPress={() => this.props.navigation.navigate('Register')}
          />
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
    textShadowOffset: {width: 4, height: 4}
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

