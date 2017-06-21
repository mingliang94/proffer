import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import EventList from '../components/EventList/EventList';


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      admin: false,
      data: []
    };
    this.data = [];
    this._loading();
  }


  async _loading() {
    let eventPath = "/event";
    let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
    firebase.database().ref(userPath).once('value').then(
      (userData) => {
        this.setState({ admin: userData.val().admin });
      });
    await firebase.database().ref(eventPath).once('value').then(
      (eventData) => {
        eventData.forEach((eventChild) => {
          this.data.push(eventChild.child("basicInfo").val());
          this.setState({ data: this.data });
        });
      }
    )
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

  async _refresh() {
    await this.setState({ data: [] })
    this.data = [] 
    this.setState({ isLoading: true });
    this._loading();
  }

  _onActionSelected = (position) => {
    if (this.state.admin) {
      switch (position) {
        case 0:
          this._refresh();
          break;
        case 1:
          this.props.navigation.navigate('Profile');
          break;
        case 2:
          this.props.navigation.navigate('AddEvent');
          break;
        case 3:
          this._logout();
          break;
        default:
          break;
      }

    }
    else {
      switch (position) {
        case 0:
          this._refresh();
          break;
        case 1:
          this.props.navigation.navigate('Profile');
          break;
        case 2:
          this.props.navigation.navigate('UserEvent');
          break;
        case 3:
          this._logout();
          break;
        default:
          break;
      }
    }
  };


  _renderLoad = () => (
    <View style={{ flex: 1 }}>
      <Spinner visible={true} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
    </View>
  );

  _renderContent = () => (
    <EventList data={this.state.data} onPress={(eventInfo) => {
      this.props.navigation.navigate('EventPage', eventInfo)
    }
    } />
  );




  render() {
    let content = this.state.isLoading ? this._renderLoad() : this._renderContent();
    var toolbarActions = this.state.admin ?
      [{ title: "refresh", show: 'always' }, { title: 'Edit profile', show: 'never' }, { title: 'Add Event', show: 'never' }, { title: 'Logout', show: 'never' }] :
      [{ title: "refresh", show: 'always' }, { title: 'Edit profile', show: 'never' }, { title: 'Event Signed Up', show: 'never' }, { title: 'Logout', show: 'never' }];

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

