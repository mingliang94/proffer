import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import loginscreen from './app/routes/loginscreen';
import MainActivity from './app/routes/MainActivity';
import registerscreen from './app/routes/registerscreen';
import ProfilePage from './app/routes/ProfilePage';
import AddEvent from './app/routes/AddEvent';
import EventPage from './app/routes/EventPage/EventPage';
import signupEvent from './app/routes/signupEvent';
import UserEvent from './app/routes/UserEvent';
import OrganiserViewEventList from './app/routes/OrganiserViewEventList'

const proffer = StackNavigator({
  Login: { screen: loginscreen },
  Register: {screen: registerscreen},
  Event: { screen: MainActivity },
  Profile: {screen: ProfilePage},
  AddEvent:{screen: AddEvent},
  EventPage:{screen:EventPage},
  signupEvent: {screen: signupEvent},
  UserEvent:{screen: UserEvent},
  OrgViewEvents:{screen:OrganiserViewEventList}
});


AppRegistry.registerComponent('proffer', () => proffer);
