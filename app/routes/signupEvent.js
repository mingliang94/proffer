import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, Button, Alert } from 'react-native';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import { TextField } from 'react-native-material-textfield';
import { StackNavigator, NavigationActions } from 'react-navigation';

var self = null;
export default class signupEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            title: this.props.navigation.state.params.title,
            eventId: this.props.navigation.state.params.eventId,
            date: this.props.navigation.state.params.date,
            mobileNo: "",
            email: "",
            addInfo: ""
        };
        this._loading();
        self = this.state.title;
    };

    _loading() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
        firebase.database().ref(userPath).once('value').then(
            (userData) => {
                this.setState({
                    username: userData.val().name,
                    mobileNo: userData.val().mobileNo,
                    email: userData.val().email
                });
            });
    };

    static navigationOptions = {
        title: self,
        headerStyle: {
            backgroundColor: '#95A5A6',
            elevation: null,
        },
    };

    async _signup() {
        var eventPath = "/event/" + this.state.eventId + "/users/" + firebase.auth().currentUser.uid;
        var userPath = "/users/" + firebase.auth().currentUser.uid + "/events/" + this.state.eventId;
        try {
            await firebase.database().ref(eventPath).set({
                name: this.state.username,
                mobileNo: this.state.mobileNo,
                email: this.state.email,
                addInfo: this.state.addInfo,
            }).then(
                () => firebase.database().ref(userPath).update({
                    signup: true
                })
                );
            Alert.alert("Proffer", "Sucessfully signed up!",
                [{ text: "ok", onPress: () => this.loginMain() }])
        }
        catch (error) {
            alert(error.toString())
        }
    }

    loginMain() {
        return this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Event' })
                    ]
                }));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <View style={{ alignItems: 'stretch' }}>
                            <Text style={styles.name}> Name: {this.state.username} </Text>
                            <View style={{ flex: 1, alignItems: 'stretch' }}>
                                <TextField
                                    label="Mobile No."
                                    value={this.state.mobileNo}
                                    onChangeText={(text) => this.setState({ mobileNo: text })}
                                />
                                <TextField
                                    label="Prefered Email"
                                    keyboardType={'email-address'}
                                    value={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                                <Text style={styles.addInfo}> Additional information: </Text>
                                <View style={{ flex: 1, backgroundColor: 'white', margin: 10, borderWidth: 0.5, borderColor: 'black' }}>
                                    <TextInput
                                        value={this.state.addInfo}
                                        multiline={true}
                                        numberOfLines={9}
                                        onChangeText={(text) => this.setState({ addInfo: text })}
                                        style={{ textAlignVertical: 'top' }}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                            <Button
                                title='Sign Up for event'
                                color='blue'
                                onPress={() => this._signup()}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>

        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        height: '100%',

    },
    name: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    addInfo: {
        fontSize: 15,
        fontFamily: 'Roboto',
        marginTop: 10,
    }
});