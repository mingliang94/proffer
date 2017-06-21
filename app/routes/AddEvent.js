import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { TextField } from 'react-native-material-textfield';

export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            desc: "",
            time: "",
            organisationName:"",
            addInfo:"",
            eventId: Math.floor(100000000000 + Math.random() * 899999999999),
        };
    }

     static navigationOptions = {
        title: 'Add New Event',
        headerStyle: {
            backgroundColor: '#F8C471',
            elevation: null,
        },
    };

    checkInfo=()=>{
        if(this.state.title.length==0 ||
            this.state.date.length==0 ||
            this.state.desc.length==0 ||
            this.state.time.length==0         
        ){return true}
        else{return false}
    }

    onPress = () => {
        if(this.checkInfo()){
            Alert.alert("Proffer admin","Please fill in all the required informations!")
        }else{ 
        firebase.database().ref("/event/" + this.state.eventId + "/basicInfo").set({
            title: this.state.title,
            date: this.state.date,
            desc: this.state.desc,
            eventId: this.state.eventId,
            time: this.state.time
        }).then(() => {
            firebase.database().ref("/event/" + this.state.eventId + "/moreInfo").set({
                addInfo: this.state.addInfo,
            }).then(() => {
                Alert.alert("Proffer", "Event created!");
            });
        });
        }
    };


    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container} >
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.pagetitle}>Event Information</Text>
                </View>

                <TextField
                    label="Enter Organisation Name"
                    onChangeText={(organisationName) => this.setState({ organisationName})}
                />
                <TextField
                    label="Enter event name"
                    onChangeText={(title) => this.setState({ title })}
                />
                <TextField
                    label="Enter event date"
                    onChangeText={(date) => this.setState({ date })}
                />
                 <TextField
                    label="Enter event Time"
                    onChangeText={(time) => this.setState({ time })}
                />
                <TextField
                    label="Enter event summary"
                    onChangeText={(desc) => this.setState({ desc })}
                    multiline={true}
                />

                <Text style={styles.addInfo}> Full information </Text>
                <View style={{ flex: 1, backgroundColor: 'white', margin: 10, borderWidth: 0.5, borderColor: 'black' }}>
                    <TextInput
                        value={this.state.addInfo}
                        multiline={true}
                        numberOfLines={9}
                        onChangeText={(text) => this.setState({ addInfo: text })}
                        style={{ textAlignVertical: 'top' }}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <Button 
                    title="Create Event" 
                    onPress={this.onPress} 
                />
                </KeyboardAvoidingView>
            </View>
            </ScrollView>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:'yellow'
    },
    pagetitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
    },
    addInfo: {
        fontSize: 15,
        fontFamily: 'Roboto',
        marginTop:10,
    }
});