import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import { TextField } from 'react-native-material-textfield';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: "",
            course: "",
            year: "",
        }
        this._loading();
    }


    async _loading() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
        await firebase.database().ref(userPath).once('value').then(
            (userData) => {
                this.setState({ name: userData.val().name });
            });
        this.setState({ isLoading: false })
    }

    static navigationOptions = {
        title: 'Profile Page',
        headerStyle: {
            backgroundColor: '#95A5A6',
            elevation: null,
        },
    };

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.title}> Profile </Text>
                <Text style={styles.name}> Name: {this.state.name}</Text>
                <TextField
                    label="Course of study"
                    value={this.state.course}
                    onChangeText={(text) => this.setState({ course: text })}
                />
            </View >
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    name:{
         fontSize: 20,
         
    }
})




