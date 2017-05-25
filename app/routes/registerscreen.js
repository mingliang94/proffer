import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button
} from 'react-native';
import TextBox from '../components/TextBox';
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';

export default class registerscreen extends Component {
    static navigationOptions = {
        title: 'Registration'
    };
    static navigatorStyle = {
        navBarBackgroundColor: 'blue'
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center',alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../images/handshake.png')}
                    />
                </View>
                <TextBox functionName='Name' />
                <TextBox functionName='NUS Email address' />
                <TextBox functionName='Username' />
                <TextBox functionName='Password' />


                <Button
                    title="Register"
                    color='blue'
                />




            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'purple'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('proffer', () => registerscreen);