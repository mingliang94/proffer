/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import loginscreen from './app/routes/loginscreen';
import eventscreen from './app/routes/eventscreen';

const proffer = StackNavigator({
  /*Event: { screen: eventscreen },*/
  Login: { screen: loginscreen },
});

AppRegistry.registerComponent('proffer', () => proffer);
