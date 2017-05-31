import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class UsernameBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.value };
    }

    render() {
        return (
            <TextField
                label='Password'
                secureTextEntry={true}
                value={this.state.text}
                onChangeText={(text) => this.setState({ text })}
            />
        );
    }
}

