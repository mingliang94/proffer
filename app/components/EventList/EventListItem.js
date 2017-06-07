import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';

export default class EventListItem extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => this.props.onPress(this.props.eventId)}
                >
                    <View>
                        {/* Title bar (includes icon, title, date) */}
                        <EventListItemTitle title={this.props.title} date={this.props.date} />

                        {/* Content (includes description, organiser, etc */}
                        <EventListItemContent description={this.props.description} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class EventListItemTitle extends React.Component {
    render() {
        return (
            <View style={styles.containerTitle}>
                <View style={styles.image} />

                <View style={styles.title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.dateText}>{this.props.date.toDateString()}</Text>
                </View>
            </View>
        );
    }
}

class EventListItemContent extends React.Component {
    render() {
        return (
            <View style={styles.containerDesc}>
                <Text>{this.props.description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
    },
    titleText: {
        fontWeight: 'bold',
    },
    dateText: {
        fontStyle: 'italic',
    },
    containerDesc: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    image: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'red',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
});