import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import EventPageContent from './EventPageContent';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from "firebase";


export default class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            title: this.props.navigation.state.params.title,
            eventId: this.props.navigation.state.params.eventId,
            date: this.props.navigation.state.params.date,
            time: this.props.navigation.state.params.time,
            desc:this.props.navigation.state.params.desc,
            moreInfo: ""
        };
        this._loading()
    };

    async _loading() {
        let moreInfoPath = "/event/" + this.state.eventId + "/moreInfo"
        await firebase.database().ref(moreInfoPath).once('value').then((addInfo) =>
        { this.setState({ moreInfo: addInfo.child("addInfo").val()}) })
        this.setState({ isLoading: false })
    }

    static navigationOptions = {
        title: 'Event Page',
        headerStyle: {
            backgroundColor: 'yellow',
            elevation: null,
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <EventPageContent
                        title={this.state.title}
                        date={this.state.date}
                        eventId={this.state.eventId}
                        time={this.state.time}
                        moreInfo={this.state.moreInfo}
                        desc={this.state.desc}
                    />
                </ScrollView>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={"Loading..."}
                    textStyle={{ color: '#FFF' }}
                />
                <Button
                    title="Go to SignUp Page"
                    onPress={() => this.props.navigation.navigate('signupEvent', {
                        title: this.state.title,
                        eventId: this.state.eventId,
                        date: this.state.date,
                    })} />
            </View>
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    button: {
    },

});