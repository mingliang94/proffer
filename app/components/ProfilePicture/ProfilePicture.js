import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
 
const userDefaultImagePath = require("../images/blankprofilepicture.png");

// Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
 
export default class ProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: {
                uri: ""
            },
        }
    }
 
    getImg = () => {
        var options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({ imgSrc: { uri: "" } });
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({ imgSrc: { uri: response.uri } });
                this.uploadImage(response.uri)
                    .then(url => this.setState({ imgSrc: { uri: url } }))
                    .catch(error => {
                        alert(error)
                        console.log(error)
                    })
            }
        });
    }
 
    uploadImage = (uri, mime = 'application/octet-stream') => {
        return new Promise((resolve, reject) => {
            let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            let userImagePath = firebase.auth().currentUser.uid + '/profile/';
            let imageRef = storage.ref('images').child(userImagePath);
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
 
    render() {
        let img = this.state.imgSrc.uri === "" ? <Image source={userDefaultImagePath} style={this.props.style} /> : <Image source={this.state.imgSrc} style={this.props.style} />
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
            >
                {img}
            </TouchableWithoutFeedback>
        );
    }
}