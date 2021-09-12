import firebase from 'firebase/app'
import  'firebase/firebase-auth'
import  'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwb3NGqSY8LFci4C61oA_2Rq_Rw7HBCjo",
    authDomain: "chatkeun.firebaseapp.com",
    projectId: "chatkeun",
    storageBucket: "chatkeun.appspot.com",
    messagingSenderId: "29636271699",
    appId: "1:29636271699:web:d5abde4ed98911452730a6"
  };

  // create app initialize app
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  
  // database
  const db = firebaseApp.firestore()

  //auth
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  export { auth, provider }
  export default db

