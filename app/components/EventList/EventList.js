import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import EventListItem from './EventListItem'

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    onPress = (eventId) => {
        this.props.onPress(eventId);
    }

    _renderItem = ({ item }) => (
        <EventListItem
            title={item.title}
            date={item.date}
            description={item.desc}
            eventId={item.eventId}
            onPress={this.onPress}
        />
    );

    _renderSeparator = () => (
        <View
            style={{
                height: 1,
                backgroundColor: 'black',
            }}
        />
    );

    _keyExtractor = ( item, index ) => (item.eventId);

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}