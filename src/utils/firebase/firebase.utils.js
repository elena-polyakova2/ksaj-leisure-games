import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyAqytGkT_CVnO15MA5XhQcQ_-PwIDrL0lE",

  authDomain: "ksaj-leisure-games-db.firebaseapp.com",

  projectId: "ksaj-leisure-games-db",

  storageBucket: "ksaj-leisure-games-db.appspot.com",

  messagingSenderId: "228598357745",

  appId: "1:228598357745:web:4c9e951d88b713e513d350"

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

//Google authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if(!userAuth) return; //protect if user didn't fill out the fields for authentication

  const userDocRef = doc(db, 'users', userAuth.uid); 
  
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  
  //if user data exists
  if(!userSnapshot.exists()) {
    //create document with user data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date(); //get data when user signed in

    try {
      //set document and pass the data to see in it
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });

    } catch (error){
      console.log('Error occured when tried to create the user', error.message);
    }
  } 
  //if user data doesn't exist
  return userDocRef;
 };

 //sign up user with email and password
 export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return; //protect if don't get email or password

  return await createUserWithEmailAndPassword(auth, email, password);
 }

 //sign in with email and password
 export const signInAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return; //don't run if don't get email or password

  return await signInWithEmailAndPassword(auth, email, password);
 }