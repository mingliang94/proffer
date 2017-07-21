import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import TextBox from '../components/TextBox';
import { TextField } from 'react-native-material-textfield';
import { StackNavigator } from 'react-navigation';
import * as firebase from "firebase";
import ImageHandler from '../components/ProfilePicture/ImageHandler';

const userDefaultImage = require('../images/blankprofilepicture.png');

export default class registerscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            name: "",
            imgSrc: userDefaultImage,
        }
    }

    static navigationOptions = {
        title: 'Registration',
        headerStyle: { backgroundColor: '#000568' },
        headerTitleStyle: { color: "#ffcc00" },
    }

    async signup(email, pass) {
        //Remove false to allow NUS email only
        if (email.search("@u.nus.edu") == -1 && false) {
            Alert.alert("Proffer", "Please enter a valid nus email.");
            this.setState({ email: "" });
        } else if (this.checkValidEntry()) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, pass);
                firebase.auth().currentUser.sendEmailVerification();
                let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
                firebase.database().ref(userPath).set({ name: this.state.name, admin: false });
                Alert.alert("Proffer", "Verification email sent! \nPlease check your email. ",
                    [{ text: "ok", onPress: () => this.props.navigation.goBack() }]
                );


            } catch (error) {
                Alert.alert("Proffer", error.toString())
            }
        }
    }

    checkValidEntry = () => {
        if (!/^[a-zA-Z\s]*$/.test(this.state.name) && this.state.name.length != 0) {
            Alert.alert("Proffer", "Please enter a valid name.");
            return false;
        } else if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.state.email)) {
            Alert.alert("Proffer", "Please enter a valid nus email.");
            return false;
        } else {
            return true;
        }
    }

    getImg = () => {
        ImageHandler.getImg()
        .then((uri) => {
            this.setState({imgSrc:{uri}});
            alert(uri);
            ImageHandler.uploadImage(uri)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback
                        style={{ width: 150, height: 150, borderRadius: 75 }}
                        onPress={this.getImg}
                    >
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 75 }}
                            source={this.state.imgSrc}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <TextField
                    label='Name'
                    value={this.state.name}
                    autoCapitalize='words'
                    onChangeText={(text) => this.setState({ name: text })}
                />
                <TextField
                    label='NUS Email address'
                    value={this.state.email}
                    keyboardType={'email-address'}
                    onChangeText={(text) => this.setState({ email: text })}
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
                        onPress={() => this.signup(this.state.email, this.state.password)}
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