import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAkhp2NXJonNEkGUjfbpiesGMa6mjD0Qec",
  authDomain: "mtechzilla-ae65a.firebaseapp.com",
  projectId: "mtechzilla-ae65a",
  storageBucket: "mtechzilla-ae65a.appspot.com",
  messagingSenderId: "218934184492",
  appId: "1:218934184492:web:0b297936517dbdbbee9f89",
  measurementId: "G-WYC4ECBSGY"
};


// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
