import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Alert
} from 'react-native';
import TextBox from '../components/TextBox';
import UsernameBox from '../components/UsernameBox';
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';
import * as firebase from "firebase";

export default class registerscreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: this.props.navigation.state.params.username,
            password: this.props.navigation.state.params.password,
            name: "",
            email: "",
        }
    }

    static navigationOptions = {
        title: 'Registration',
        headerStyle: {
            backgroundColor: '#95A5A6',
            elevation: null,
        },
    };

    async signup(email, pass) {

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, pass);
            firebase.auth().currentUser.sendEmailVerification();
            
            Alert.alert("Proffer","Verification email sent! \n Please check your email. ",
            [{text:"ok", onPress:()=>this.props.navigation.goBack()}]
            );


        } catch (error) {
            alert(error.toString())
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../images/handshake.png')}
                    />
                </View>
                <TextField
                    label='Name'
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                />
                <TextField
                    label='NUS Email address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextField
                    label='Username'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <TextField
                    label='Password'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <View style={{
                    alignSelf: 'center', alignItems: 'center', maxWidth: 100,
                }}>
                    <Button
                        title="Register"
                        color='blue'
                        onPress={() => this.signup(this.state.email,this.state.password)}
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