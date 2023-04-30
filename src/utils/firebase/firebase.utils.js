import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

//Google authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      await setDoc(userDocRef, { displayName, email, createdAt });

    } catch (error){
      console.log('Error occured when tried to create the user', error.message);
    }
  } 
  //if user data doesn't exist
  return userDocRef;
 };