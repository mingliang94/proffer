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
import loginscreen from './app/routes/loginscreen'

const proffer = StackNavigator({
  Login: {screen: loginscreen},
});


AppRegistry.registerComponent('proffer', () => proffer);
