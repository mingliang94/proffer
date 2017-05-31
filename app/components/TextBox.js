import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.value };
    }

    render() {
        return (
            <TextField
                label={this.props.functionName}
                value={this.state.text}
                onChangeText={(text) => this.setState({ text })}
            />
        );

    }
}

AppRegistry.registerComponent('proffer', () => TextBox);