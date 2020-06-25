import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCXX8hp81_yiptvIDyKch-i_F39nBe4FcM",
    authDomain: "yammy-c473e.firebaseapp.com",
    databaseURL: "https://yammy-c473e.firebaseio.com",
    projectId: "yammy-c473e",
    storageBucket: "yammy-c473e.appspot.com",
    messagingSenderId: "635335262399",
    appId: "1:635335262399:web:84214970715909beb2460a",
    measurementId: "G-Q1J13KHJYY"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;