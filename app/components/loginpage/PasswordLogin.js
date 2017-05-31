import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class PasswordLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

   textchange(){
       this.props.changeTextFunc(this.state.text);
   }

    render() {
        return (
            <TextField
                label='Password'
                value={this.state.text}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.textchange()}
            />
        );

    }
}
