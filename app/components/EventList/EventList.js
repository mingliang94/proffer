import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import EventListItem from './EventListItem'

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({ item }) => (
        <EventListItem
            title={item.title}
            date={item.date}
            desc={item.desc}
            eventId={item.eventId}
            time={item.time}
            onPress={this.props.onPress}
        />
    );

   

    _keyExtractor = ( item, index ) => (item.eventId);

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}

            />
        );
    }
}