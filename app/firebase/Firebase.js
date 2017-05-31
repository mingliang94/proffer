import * as firebase from "firebase";

/* Change the firebase account details*/

export default class Firebase {
   static initialise() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyC1-hRLhNBPq7DNkOG5iX644yLvPfY1U7A",
                authDomain: "my-first-project-5ee38.firebaseapp.com",
                databaseURL: "https://my-first-project-5ee38.firebaseio.com",
                projectId: "my-first-project-5ee38",
                storageBucket: "my-first-project-5ee38.appspot.com",
                messagingSenderId: "5368545924"
            });
        }
    }
}