import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Alert
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
            mobileNo: "",
            email: "",
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
            backgroundColor: '#F8C471',
            elevation: null,
        },
    };

    async _updateProfile() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
        try {
            await firebase.database().ref(userPath).update({
                name: this.state.name,
                mobileNo: this.state.mobileNo,
                email: this.state.email
            });
            Alert.alert("Proffer","Sucessfully updated profile!",
            [{ text: "ok", onPress: () => this.props.navigation.goBack()}])
        }
        catch(error){
            alert(error.toString())
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.title}> Profile </Text>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                />
                <TextField
                    label="Mobile No."
                    keyboardType={'numeric'}
                    value={this.state.mobileNo}
                    onChangeText={(text) => this.setState({ mobileNo: text })}
                />
                <TextField
                    label="Preferred Email"
                    keyboardType={'email-address'}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <Button
                    title="Update profile"
                    color='blue'
                    onPress={() => this._updateProfile()}
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
    name: {
        fontSize: 20,

    }
})




