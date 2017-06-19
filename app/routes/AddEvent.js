import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, Alert, KeyboardAvoidingView } from 'react-native';
import * as firebase from "firebase";
import { TextField } from 'react-native-material-textfield';

export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            desc: "",
            eventId: Math.floor(100000000000 + Math.random() * 899999999999),
            signupProcess: "",
        };
    }

    onPress = () => {
        firebase.database().ref("/event/" + this.state.eventId + "/basicInfo").set({
            title: this.state.title,
            date: this.state.date,
            desc: this.state.desc,
            eventId: this.state.eventId,
        }).then(() => {
            firebase.database().ref("/event/" + this.state.eventId + "/moreInfo").set({
                signupProcess: this.state.signupProcess,
            }).then(() => {
                Alert.alert("Event created", "Event created!");
            });
        });
    };


    render() {
        return (
            <View style={styles.container} >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>BASIC INFO</Text>
                </View>
                <TextField
                    label="Enter event name"
                    onChangeText={(title) => this.setState({ title })}
                />
                <TextField
                    label="Enter event date"
                    onChangeText={(date) => this.setState({ date })}
                />
                <TextField
                    label="Enter event description"
                    onChangeText={(desc) => this.setState({ desc })}
                    multiline={true}
                />

                <TextField
                    label ="Enter signup stuff"
                    onChangeText={(signupProcess) => this.setState({ signupProcess })}
                />

                <Button title="Create Event" onPress={this.onPress} />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});