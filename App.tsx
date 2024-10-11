import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { initializeApp } from '@firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,
  signOut,
  User
} from '@firebase/auth';
import AuthScreen from './components/AuthScreen';
import AuthenticatedScreen from './components/AuthenticatedScreen';

const firebaseConfig = {
  apiKey: "AIzaSyB44mWGaDDWjdhc6m1dyewVdSOP4OEJPkk",
  authDomain: "reda-fb.firebaseapp.com",
  projectId: "reda-fb",
  storageBucket: "reda-fb.appspot.com",
  messagingSenderId: "72744660787",
  appId: "1:72744660787:web:2a7eeb88e65aaa2cd65846",
  measurementId: "G-W3LK2WMQQR"
};

const app = initializeApp(firebaseConfig);


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error : any) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View className='grow justify-center items-center p-4 bg-[#f0f0f0]'>
      {user ?
      (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      )
      : 
      (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </View>
  );
}
