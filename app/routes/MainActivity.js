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
import EventList from '../components/EventList/EventList';


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    let d1 = new Date();
    this.state = {
      isLoading: true,
      name: "",
      data: [{
        key: '1',
        title: 'dog',
        date: d1,
        desc: "sadfjakfhkdafadfhkadsfhkadsfhkdhfkahfkjadshfkhfkhdksfdas",
        eventId: "jdhcf9q23hfuihenf"
      },
      {
        key: '2',
        title: 'asds',
        date: d1,
        desc: "Lots of words and lots of words and lots of words and lots of words and lots of words and lots of words and lots of words and",
        eventId: "nc2nr0i3rjl23dfsp",
      },
      {
        key: '3',
        title: 'Nice Event!',
        date: d1,
        desc: "No description",
        eventId: "91ic09n2i13ei2ji2",
      },
      {
        key: '4',
        title: 'Free Money!',
        date: d1,
        desc: "No description",
        eventId: "01c309rej1c923irj",
      },
      {
        key: '5',
        title: 'A very loooooooooooooooooooooooooooooooooooooooooooooooooooooong title',
        date: d1,
        desc: "No description",
        eventId: "021ixz0912keo2je3",
      },
      {
        key: '6',
        title: 'A',
        date: d1,
        desc: "Test\nTest\nTest\nTest",
        eventId: "dikt9054ijkriowj5",
      }]
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
      <EventList data={this.state.data} onPress={null} />
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

