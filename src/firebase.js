import { firebase } from '@firebase/app'
import '@firebase/auth'
import 'firebase/storage';

const conf = {
    apiKey: "AIzaSyD07XSoh39LWAJo1Iw7XVmayUVtrFnorJQ",
    authDomain: "dulceria8a.firebaseapp.com",
    projectId: "dulceria8a",
    storageBucket: "dulceria8a.appspot.com",
    messagingSenderId: "295307217893",
    appId: "1:295307217893:web:632be90f6fbab6ac1a7d0c",
    measurementId: "G-2BPE435HTG"
}

firebase.initializeApp(conf);

const storage = firebase.storage()

export{
    storage
}