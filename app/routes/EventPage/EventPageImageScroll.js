import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class EventPageImageScroll extends React.Component {
    constructor(props) {
        super(props);
        this.itemCount = 0;
    }

    _renderItem = ({item}) => {
        this.itemCount+=1;
        return (
            <EventImageItem
                key={this.itemCount}
                imgSrc={""}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.imageList}
                    horizontal={true}
                />
            </View>
        );
    }
}

class EventImageItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.placeholderImageStyle} />
        );
    }
};

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
    button: {
    },
    placeholderImageStyle: {
        height: 140,
        width: 100,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        backgroundColor: 'gray',
    },
});