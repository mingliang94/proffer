import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import EventList from '../components/EventList/EventList';

export default class UserEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        };
        this.eventId = [];
        this.data = [];
        this._loading();
    }

    static navigationOptions = {
        title: 'Event Signed Up',
        headerStyle: {
            backgroundColor: '#F8C471',
            elevation: null,
        },
    };

    async _loading() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/events";
        await firebase.database().ref(userPath).once('value').then(
            (eventData) => {
                eventData.forEach((eventChild) => {
                    firebase.database().ref("/event/" + eventChild.key + "/basicInfo").once('value').then(
                        (eventInfo) => {
                            this.data.push(eventInfo.val());
                            this.setState({ data: this.data });
                        }
                    )
                });
            }
        )
        this.setState({ isLoading: false })
    }

    _renderLoad = () => (
        <View style={{ flex: 1 }}>
            <Spinner visible={true} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
        </View>
    );

    _renderContent = () => (
        <EventList data={this.state.data} onPress={()=>alert("function not developed!")}/>
    );

    render() {
        let content = this.state.isLoading ? this._renderLoad() : this._renderContent();
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'yellow',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});



