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
import UsernameBox from '../components/UsernameBox';
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';

export default class registerscreen extends Component {
    static navigationOptions = {
        title: 'Registration',
        headerStyle: {
            backgroundColor: '#95A5A6',
            elevation: null,
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../images/handshake.png')}
                    />
                </View>
                <TextBox functionName='Name' />
                <TextBox functionName='NUS Email address' />
                <UsernameBox />
                <TextBox functionName='Password' />

                <View style={{
                    alignSelf: 'center', alignItems: 'center', maxWidth: 100,
                }}>
                    <Button
                        title="Register"
                        color='blue'
                    />

                </View>
                <View style={{
                    alignSelf: 'center', alignItems: 'center'
                }}>
                    <Text>
                        {'\n'}
                        An email will to be sent to NUS email for
                    verficiation.{'\n'}{'\n'}
                        By signing up, you automatically agree to the{'\n'}
                        terms and conditions
                </Text>
                </View>
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