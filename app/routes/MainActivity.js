import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  Animated
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import Spinner from 'react-native-loading-spinner-overlay';


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: "",
      data: [
        { key: 'a' },
        { key: 'b' }
      ]
    };
    this._loading = this._loading.bind(this);
    this._loading();
  }


  async _loading() {
    let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
    await firebase.database().ref(userPath).once('value').then(
      (userData) => {
        this.setState({ name: userData.val().name });
      });
    this.setState({ isLoading: false })
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

  _renderLoad = () => (
     <View style={{ flex: 1 }}>
        <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
  );

  _renderContent = () => ( 
      <View style={styles.content}>
        <Text style={styles.welcome}> Welcome {this.state.name}</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this._renderItem(item)}
        />
      </View>
  );

  render() {
    let content = this.state.isLoading ? this._renderLoad() : this._renderContent();
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
        {content}
      </View>
    );
  }
}

var toolbarActions = [
  { title: 'Edit profile', show: 'never' },
  { title: 'Logout', show: 'never' },

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

