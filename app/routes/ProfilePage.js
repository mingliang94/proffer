import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Firebase from "../firebase/Firebase";
import { TextField } from 'react-native-material-textfield';
import  ImageHandler from '../components/ProfilePicture/ImageHandler'
const userDefaultImage = require('../images/blankprofilepicture.png');

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: "",
            mobileNo: "",
            email: "",
            imgSrc: userDefaultImage,
        }
        this._loading();
    }


    async _loading() {
        let userPath = "/users/" + firebase.auth().currentUser.uid + "/info";
        await firebase.database().ref(userPath).once('value').then(
            (userData) => {
                this.setState({
                    name: userData.val().name,
                    mobileNo: userData.val().mobileNo,
                    email: userData.val().email
                });
            });
        this.setState({ isLoading: false })
    }

    static navigationOptions = {
        title: 'Profile Page',
        headerStyle: {
            backgroundColor: 'yellow',
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
            Alert.alert("Proffer", "Sucessfully updated profile!",
                [{ text: "ok", onPress: () => this.props.navigation.goBack() }])
        }
        catch (error) {
            alert(error.toString())
        }
    }

    getImg = () => {
        ImageHandler.getImg()
            .then((uri) => {
                this.setState({ imgSrc: { uri } });

                ImageHandler.uploadImage(uri)
            })
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.title}> Profile </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback
                        style={{ width: 150, height: 150, borderRadius: 75 }}
                        onPress={this.getImg}
                    >
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 75 }}
                            source={this.state.imgSrc}
                        />
                    </TouchableWithoutFeedback>
                </View>
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
        backgroundColor: 'white',
        justifyContent: 'flex-start',

    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'purple',
    },
    name: {
        fontSize: 20,

    }
})




