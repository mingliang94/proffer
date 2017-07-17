import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    Alert,
    View,
    TextInput,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    TouchableHighlight
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    };

    render() {
        this.state.name = this.props.name
        if (this.props.admin) {
            return (
                <View style={{ flex: 1, backgroundColor: '#ffcc00' }}>
                    <View>
                        <Text style={styles.welcome}>Welcome {this.state.name}!</Text>
                    </View>
                    <TouchableHighlight onPress={() => this.props.AddEvent()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>Add Event</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.OrgViewEvents()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>View Organised Event</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.profile()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>Edit Profile</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._logout()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View>
                            <Text style={styles.options}>Logout</Text>
                        </View>
                    </TouchableHighlight>
                </View >
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#ffcc00' }}>
                    <View>
                        <Text style={styles.welcome}>Welcome {this.state.name}!</Text>
                    </View>
                    <TouchableHighlight onPress={() => this.props.UserEvent()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>View Event Joined</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.profile()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>Edit Profile</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props._logout()} underlayColor='#4d2600' activeOpacity={0.9}>
                        <View style={styles.optionsBox}>
                            <Text style={styles.options}>Logout</Text>
                        </View>
                    </TouchableHighlight>
                </View >
            )
        }
    }
}

const styles = StyleSheet.create({
    optionsBox: {
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    options: {
        fontSize: 18,
        margin: 8
    }
})