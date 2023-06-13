import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { Category } from '../../store/categories/categories.types';

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

//get data
export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async<T extends ObjectToAdd> (
  collectionKey: string, 
  objectsToAdd: T[]
  ): Promise<void> => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  

  //get category object from data
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//get categories from the actual Firebase database 
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'collections');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  //get back categories array
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
};

export type AdditionalIhformation = {
  displaName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User, 
  additionalInformation = {} as AdditionalIhformation
  ): Promise<void | QueryDocumentSnapshot<UserData>> => { //promise void or QueryDocumentSnapshot

  if(!userAuth) return; //protect if user didn't fill out the fields for authentication

  const userDocRef = doc(db, 'users', userAuth.uid); 
  
  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  
  //create user if doesn't exist
  if(!userSnapshot.exists()) {
    //create document with user data from userAuth
    const { displayName, email } = userAuth;
    const createdAt = new Date(); //get data when user signed in

    try {
      //set document and pass the data to see in it
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });

    } catch (error){
      console.log('Error occured when tried to create the user', error);
    }
  } 
  //if user data doesn't exist
  return userSnapshot as QueryDocumentSnapshot<UserData>;
 };

 //sign up user with email and password
 export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {

  if (!email || !password) return; //protect if don't get email or password

  return await createUserWithEmailAndPassword(auth, email, password);
 };

 //sign in with email and password
 export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {

  if (!email || !password) return; //don't run if don't get email or password

  return await signInWithEmailAndPassword(auth, email, password);
 };

 export const signOutUser = async () => await signOut(auth);

 //observer listener
 export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

 //see if there is authenticated user already
 export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};