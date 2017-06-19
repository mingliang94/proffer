import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class EventPageContent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <EventPageContentTitle title={this.props.title} date={this.props.date}/>
                <View style={styles.lineView} />
                <Text>Event ID: {this.props.eventId} </Text>
            </View>
        );
    }
}

class EventPageContentTitle extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.titleImage} />
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.titleDateText}>
                        {this.props.date}
                    </Text>
                </View>
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
    titleContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row',
    },
    titleImage: {
        borderRadius: 50,
        backgroundColor: 'blue',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        height: 100,
        width: 100,
    },
    titleTextContainer: {
        flex: 1,
        marginTop: 20,
    },
    button: {
    },
    lineView: {
        height: 1,
        backgroundColor: 'black',
    },

    // Text Styles
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleDateText: {
        fontSize: 16,
        color: 'gray',
    }
});