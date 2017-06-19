import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";

var self = null;
export default class signupEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            title: this.props.navigation.state.params.title,
            eventId: this.props.navigation.state.params.eventId,
            date: this.props.navigation.state.params.date
        };
        this._loading();
        self = this.state.title;
    };

    _loading() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
        firebase.database().ref(userPath).once('value').then(
            (userData) => {
                this.setState({ username: userData.val().name });
            });
    };

    

    static navigationOptions = {
        title: self,
        headerStyle: {
            backgroundColor: '#95A5A6',
            elevation: null,
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Text> Name: {this.state.username} </Text>
            </View>

        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'yellow',
    }
});