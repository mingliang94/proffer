import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, Alert, KeyboardAvoidingView } from 'react-native';
import * as firebase from "firebase";

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
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>BASIC INFO</Text>
                </View>
                <TextInput
                    placeholder="Enter event name"
                    onChangeText={(title) => this.setState({ title })}
                    marginBottom={30}
                    marginLeft={20}
                    marginRight={20}
                />
                <TextInput
                    placeholder="Enter event date"
                    onChangeText={(date) => this.setState({ date })}
                    marginBottom={30}
                    marginLeft={20}
                    marginRight={20}
                />
                <TextInput
                    placeholder="Enter event description"
                    onChangeText={(desc) => this.setState({ desc })}
                    marginBottom={30}
                    marginLeft={20}
                    marginRight={20}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text>Randomly generated event ID: {this.state.eventId}</Text>
                    <Text style={{ fontWeight: 'bold' }}>MORE INFO</Text>
                </View>

                <TextInput
                    placeholder="Enter signup stuff"
                    onChangeText={(signupProcess) => this.setState({ signupProcess })}
                    marginBottom={30}
                    marginLeft={20}
                    marginRight={20}
                />

                <Button title="Create Event" onPress={this.onPress} />
            </KeyboardAvoidingView>
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