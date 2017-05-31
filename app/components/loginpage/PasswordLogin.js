import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class PasswordLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

   textchange(text){
       this.setState({text:text})
       this.props.changeTextFunc(text);
   }

    render() {
        return (
            <TextField
                label='Password'
                secureTextEntry={true}
                value={this.state.text}
                onChangeText={(text) => this.textchange(text)}
            />
        );

    }
}
