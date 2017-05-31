import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';



export default class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = { text: "" };
    }
    render() {
        return (
            <Button
                title="Login"
                color="blue"
            />
        );

    }
}