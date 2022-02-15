import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB7itztCV2QT0OGsFHKn_sAbSpPPm8NZ0U',
  authDomain: 'slack-clone-b11ab.firebaseapp.com',
  projectId: 'slack-clone-b11ab',
  storageBucket: 'slack-clone-b11ab.appspot.com',
  messagingSenderId: '508242248352',
  appId: '1:508242248352:web:91ad4b72df87089943bfc5',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
setPersistence(getAuth(), browserSessionPersistence);

export const provider = new GoogleAuthProvider();
export const addRoom = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), {
      name,
    });
  } catch (e) {}
};
