import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  DrawerLayoutAndroid
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import MainEventList from '../components/EventList/MainEventList';
import MyDrawer from '../components/MyDrawer'


export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      admin: false,
      data: [],
      dataUser: [],
      name: ""
    };
    this.data = [];
    this.dataUser = [];
    this.userEvent = [];
  }

  componentDidMount() {
    this.pullUserDataEvent();
    this._loading();
  }

  async pullUserDataEvent() {
    let userPath = "/users/" + firebase.auth().currentUser.uid + "/events";
    await firebase.database().ref(userPath).once('value').then(
      (eventData) => {
        eventData.forEach((eventChild) => {
          this.userEvent.push(eventChild.key)
        });
      })
  };

  searchId(eventId) {
    for (var i = 0; i < this.userEvent.length; i++) {
      if (eventId == this.userEvent[i]) {
        return false
      }
    };
    return true;
  }


  async _loading() {
    let eventPath = "/event";
    let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
    firebase.database().ref(userPath).once('value').then(
      (userData) => {
        this.setState({
          admin: userData.val().admin, 
          name: userData.val().name
        })
      });
    await firebase.database().ref(eventPath).once('value').then(
      (eventData) => {
        eventData.forEach((eventChild) => {
          if (this.searchId(eventChild.key)) {
            this.data.push(eventChild.child("basicInfo").val());
          }
          else {
            this.dataUser.push(eventChild.child("basicInfo").val());
          }
        });
        this.setState({ data: this.data });
        this.setState({ dataUser: this.dataUser });
      }
    )
    this.setState({ isLoading: false })
   
  };

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
    this.userEvent = []
    this.setState({ isLoading: true });
    this.pullUserDataEvent()
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
          this.props.navigation.navigate('OrgViewEvents')
          break;
        case 4:
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
    <MainEventList data={this.state.data} dataUser={this.state.dataUser} onPress={(eventInfo) => {
      this.props.navigation.navigate('EventPage', eventInfo)
    }
    } />
  );

  navigationView = () =>
    (
      <MyDrawer
        admin={this.state.admin}
        name={this.state.name}
        profile={() => this.props.navigation.navigate('Profile')}
        _logout={this._logout}
        AddEvent={() => this.props.navigation.navigate('AddEvent')}
        OrgViewEvents={() => this.props.navigation.navigate('OrgViewEvents')}
        UserEvent={() => this.props.navigation.navigate('UserEvent')}
      />
    )

  _setDrawer() {
    this.refs['DRAWER'].openDrawer();
  }

  render() {
    let content = this.state.isLoading ? this._renderLoad() : this._renderContent();
    var toolbarActions = this.state.admin ?
      [{ title: "refresh", show: 'always' }, { title: 'Edit profile', show: 'never' }, { title: 'Add Event', show: 'never' }, { title: 'View Organised Event', show: 'never' }, { title: 'Logout', show: 'never' }] :
      [{ title: "refresh", show: 'always' }, { title: 'Edit profile', show: 'never' }, { title: 'Event Signed Up', show: 'never' }, { title: 'Logout', show: 'never' }];

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => this.navigationView()}
        ref={'DRAWER'}>

        <View style={styles.container}>
          <ToolbarAndroid
            navIcon={require('../images/drawericon.png')}
            onIconClicked={() => this._setDrawer()}
            style={{
              backgroundColor: '#ffcc00',
              height: 56,
            }}
            title="Proffer"
            actions={toolbarActions}
            onActionSelected={this._onActionSelected}
          />
          {content}
        </View>
      </DrawerLayoutAndroid>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#D0D3D4',
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

