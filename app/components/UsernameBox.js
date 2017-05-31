import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class UsernameBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.value, status: false };
    }

    changetext(text) {
        this.setState({ text: text });
        this.setState({ status: true });
    }

    textchanged(text) {
        let testtext = this.state.text
        if (this.state.status) {
            if (testtext.length == 0) {
                this.setState({ status: false });
            } else
                if (testtext.length < 6) {
                    alert("The username requires at least 6 characters")
                }
        }
    }
        render() {
            return (
                <TextField
                    label='Username'
                    value={this.state.text}
                    onChangeText={(text) => this.changetext(text)}
                    onSubmitEditing={(text) => this.textchanged(text)}
                />
            );
        }
    }

    AppRegistry.registerComponent('proffer', () => TextBox);