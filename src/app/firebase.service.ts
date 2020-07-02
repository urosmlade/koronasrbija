import * as firebase from 'firebase/app';


export class FirebaseService{

    constructor(){
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBuyAK0A-rdWIEzmUn2CfM0H5gv0222qhE",
            authDomain: "korona-4acb7.firebaseapp.com",
            databaseURL: "https://korona-4acb7.firebaseio.com",
            projectId: "korona-4acb7",
            storageBucket: "korona-4acb7.appspot.com",
            messagingSenderId: "179319242600",
            appId: "1:179319242600:web:5ba5023c8a7cfe8923a0dd",
            measurementId: "G-7QRER28RNB"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
  
    }
}