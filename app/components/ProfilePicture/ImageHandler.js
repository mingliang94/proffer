import {
    Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

// Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export default class ImageHandler {
    static uploadImage = (uri, mime = 'application/octet-stream') => {
        return new Promise((resolve, reject) => {
            // let testObj = require('../../images/blankprofilepicture.png');
            let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            let userImagePath = '0bWgZGQUSnf1wECGo2xi4O1sfWH2' + '/profile'; // firebase.auth().currentUser.uid
            let imageRef = firebase.storage().ref('images').child('profile');
    


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
                    console.log(error)
                    alert(error)
                    reject(error)
                }) 
        })
    }

    static getImg = () => {
        return new Promise((resolve, reject) => {
            var options = {
                title: 'Select Profile Picture',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            };
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                    reject(response.didCancel);
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    reject(response.error);
                } else {
                    resolve(response.uri);
                }
            });
        })
    }
}