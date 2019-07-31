import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDpmVcGtLHaCilg3uOEHligRJXTrunSGtk",
  authDomain: "crwn-db-a8c63.firebaseapp.com",
  databaseURL: "https://crwn-db-a8c63.firebaseio.com",
  projectId: "crwn-db-a8c63",
  storageBucket: "",
  messagingSenderId: "668842208169",
  appId: "1:668842208169:web:38ef20f4fcb2fb8f"
};

export const createUserProfileDocument =  async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
  
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompth: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

