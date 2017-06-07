import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }



  _logout = () => {
    this.props
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
    header: null

  };


  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={{
            backgroundColor: '#F8C471',
            height: 56,
          }}
          title="Proffer"
          actions={toolbarActions}
          onActionSelected={this._onActionSelected}
        />
        <View style={styles.content}>
          <Text style={styles.welcome} >
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
      </View>
    );
  }

  _onActionSelected = (position) => {
    switch (position) {
      case 0:
        alert("Function not develop");
        break;
      case 1:
        this._logout();
        break;
      default:
        break;
    }
  };

}

 var toolbarActions = [
  { title: 'Edit profile', show: 'hide' },
  { title: 'Logout', show: 'hide' },

];

  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'yellow',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

