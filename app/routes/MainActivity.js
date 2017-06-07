import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Button,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [
        { key: 'a' },
        { key: 'b' }
      ]
    };
  }


  static navigationOptions = {
    header: null

  };


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

  _onActionSelected = (position) => {
    switch (position) {
      case 0:
        alert("Function not developed!");
        break;
      case 1:
        this._logout();
        break;
      default:
        break;
    }
  };

  _renderItem(item) {
    return (
      <View style={styles.content}>
        <Text>{item.key}</Text>
      </View>
    );
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
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this._renderItem(item)}
          />
        </View>
      </View>
    );
  }
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

