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
import MainActivity from './app/routes/MainActivity';
import registerscreen from './app/routes/registerscreen'

const proffer = StackNavigator({
  Login: { screen: loginscreen },
  Register: {screen: registerscreen},
  Event: { screen: MainActivity },
});


AppRegistry.registerComponent('proffer', () => proffer);
