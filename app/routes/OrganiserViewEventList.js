import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import EventList from '../components/EventList/EventList';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default class OrganiserViewEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            isLoading: true
        }
        this.data = [];
        this.getEventList();
    }

    static navigationOptions = { title: 'View Organised Events' };

    async getEventList() {
        let userEventsPath = "/users/" + firebase.auth().currentUser.uid + "/organise";
        await firebase.database().ref(userEventsPath).once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    this.getEventInfo(child.key);
                })
            });
        this.setState({ isLoading: false });
    }

    async getEventInfo(eventKey) {
        let eventPath = "/event/" + eventKey + "/basicInfo";
        await firebase.database().ref(eventPath).once('value')
            .then((snapshot) => {
                let eventInfo = snapshot.val();
                this.data.push({
                    title: eventInfo.title,
                    date: eventInfo.date,
                    desc: eventInfo.desc,
                    eventId: eventKey,
                    time: eventInfo.time,
                });
            });
        this.setState({ events: this.data });
    }

    _onPress = (event) => {
        /*
        this.props.navigation.navigate('orgEventView', {
            eventId: event.eventId,
            title: event.title,
            date: event.date,
            time: event.time,
            desc: event.desc
        });*/

    };

    render() {
        let eventListView = <View />;

        if (this.state.events.length == 0 && !this.isLoading) {
            eventListView = (
                <View style={styles.centeredContainer}>
                    <Text style={styles.textNoEventsFound}>No events found.</Text>
                </View>
            );
        } else {
            eventListView = <EventList data={this.state.events} onPress={this._onPress} />;
        }

        return (
            <View style={styles.container}>
                <View style={{ margin: 20 }}>
                    <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                    <Text style={{ fontSize: 16 }} >
                        Here, you can view the events which you're organising.
                    </Text>
                </View>
                {eventListView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    button: {
    },
    textNoEventsFound: {
        textAlign: 'center',
        fontSize: 16,
    }

});