import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Button
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  

  _logout() {
    return this.props
      .navigation
      .dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' })
          ]
        }));
  }


  static navigationOptions = {
    title: 'Proffer',
    headerStyle: {
      backgroundColor: '#95A5A6',
      elevation: null,
    },
    headerRight:
    <Button
      title='logout'
      onPress={() => this._logout()}
    />
  };

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

