import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB44mWGaDDWjdhc6m1dyewVdSOP4OEJPkk",
    authDomain: "reda-fb.firebaseapp.com",
    projectId: "reda-fb",
    storageBucket: "reda-fb.appspot.com",
    messagingSenderId: "72744660787",
    appId: "1:72744660787:web:2a7eeb88e65aaa2cd65846",
    measurementId: "G-W3LK2WMQQR"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const auth = initializeAuth(
//   app,
//   {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}
// )