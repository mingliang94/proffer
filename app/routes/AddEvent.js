import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { TextField } from 'react-native-material-textfield';
 
export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            desc: "",
            time: "",
            organisationName: "",
            addInfo: "",
            eventId: Math.floor(100000000000 + Math.random() * 899999999999),
        };
    }
 
    static navigationOptions = {
        title: 'Add New Event',
        headerStyle: {
            backgroundColor: 'yellow',
            elevation: null,
        },
    };
 
    checkInfo = () => {
        if (this.state.title.length == 0 ||
            this.state.date.length == 0 ||
            this.state.desc.length == 0 ||
            this.state.time.length == 0
        ) { return true }
        else { return false }
    }
 
    onPress = () => {
        if (this.checkInfo()) {
            Alert.alert("Proffer admin", "Please fill in all the required informations!")
        } else {
            // Event ID is based on server time
            let eventId = firebase.database().ServerValue.TIMESTAMP;
            if (this.checkEventExists(eventId) === false) {
                firebase.database().ref("/event/" + eventId + "/basicInfo").set({
                    title: this.state.title,
                    date: this.state.date,
                    desc: this.state.desc,
                    eventId: eventId,
                    time: this.state.time
                }).then(() => {
                    firebase.database().ref("/event/" + eventId + "/moreInfo").set({
                        addInfo: this.state.addInfo,
                    }).then(() => firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/organise/" + this.state.eventId)
                        .update({ eventId: eventId })).then(() => {
                            Alert.alert("Proffer", "Event created!",
                                [{ text: "ok", onPress: () => this.props.navigation.goBack() }]);
                        });
                });
            }
        }
    };
 
    checkEventExists = (eventId) => {
        // Insert function here
        return false;
    }
 
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.pagetitle}>Event Information</Text>
                        </View>
                        <TextField
                            maxLength={128}
                            label="Enter Organisation Name"
                            onChangeText={(organisationName) => this.setState({ organisationName })}
                        />
                        <TextField
                            maxLength={128}
                            label="Enter event name"
                            onChangeText={(title) => this.setState({ title })}
                        />
                        <TextField
                            maxLength={32}
                            label="Enter event date"
                            onChangeText={(date) => this.setState({ date })}
                        />
                        <TextField
                            maxLength={32}
                            label="Enter event Time"
                            onChangeText={(time) => this.setState({ time })}
                        />
                        <TextField
                            maxLength={256}
                            label="Enter event summary"
                            onChangeText={(desc) => this.setState({ desc })}
                            multiline={true}
                        />
                        <Text style={styles.addInfo}> Full information </Text>
                        <View style={{ flex: 1, backgroundColor: '#D0D3D4', margin: 10, borderWidth: 0.5, borderColor: 'black' }}>
                            <TextInput
                                value={this.state.addInfo}
                                multiline={true}
                                maxLength={4096}
                                numberOfLines={9}
                                onChangeText={(text) => this.setState({ addInfo: text })}
                                style={{ textAlignVertical: 'top' }}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Button
                            title="Create Event"
                            onPress={this.onPress}
                        />
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        );
 
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    pagetitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    addInfo: {
        fontSize: 15,
        fontFamily: 'Roboto',
        marginTop: 10,
    }
});