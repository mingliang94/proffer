import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import EventPageContent from './EventPageContent';


export default class EventPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.title,
            eventId: this.props.navigation.state.params.eventId,
            date: this.props.navigation.state.params.date
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <EventPageContent title={this.state.title} date={this.state.date} eventId={this.state.eventId} />
                </ScrollView>
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
        backgroundColor: 'yellow'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    button: {
    },

});