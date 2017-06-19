import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import EventPageImageScroll from './EventPageImageScroll';

/*
Arrangement of components on the content view:
    1) EventPageContent (main component)
        1.1) EventPageContentTitle (container to hold things related to the title)
            1.1.1) Title Image
            1.1.2) Title Name
            1.1.3) Date and time of event
            1.1.4) Organisation name
        1.2) EventPageImageScroll (scrollview component to hold the event images)
            1.2.1) Images are stored in components that display image from imgsrc
        1.3) 

Event information used
Basic: name, date, time
More : organisationName, longdescription, 

*/

export default class EventPageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: {time:null},
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <EventPageContentTitle
                    title={this.props.title}
                    date={this.props.date}
                    time={this.props.time}
                    eventDetails={this.state.eventDetails}
                />
                <View style={styles.lineView} />
                <Text>   Images </Text>
                <EventPageImageScroll imgSrc={null} />
                <EventDescription
                    eventDetails={this.state.eventDetails}
                />

            </View>
        );
    }
}

class EventDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = { asdtext: '' }
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <Text style={{ fontWeight: 'bold' }}>
                    Event Location: {this.props.eventDetails.location}{'\n '}
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                    Event Description:
                </Text>
                <Text>{this.props.eventDetails.longDesc}{'\n '}</Text>
                <Text style={{ fontWeight: 'bold' }}>
                    Additional information required from participant:
                </Text>
                <Text>
                    {this.props.eventDetails.addInfo}{'\n\n\n '}
                </Text>
            </View>
        );
    }
};

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
                        {this.props.date}, {this.props.time}
                    </Text>
                    <Text style={styles.titleOrgText}>
                        {this.props.eventDetails.organisationName}
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
    lineView: {
        height: 1,
        backgroundColor: 'black',
    },
    contentContainer: {

    },

    // Text Styles
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleDateText: {
        fontSize: 16,
        color: 'gray',
    },
    titleOrgText: {
        fontSize: 16,
        color: 'black',
    }
});