import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


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
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);