import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { initializeApp } from '@firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,
  signOut,
  User
} from '@firebase/auth';

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


const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication } : any) => {
  return (
    <View className='w-4/5 w-max-md bg-white p-4 rounded-lg'>
      <Text className='text-2xl mb-4 text-center'>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

      <TextInput
        className='h-10 border-[#ddd] border mb-4 p-2 rounded'
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        className='h-10 border-[#ddd] border mb-4 p-2 rounded'
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View className='mb-4'>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View className='mb-4'>
        <Text className=' text-[#3498db] text-center' onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

const AuthenticatedScreen = ({ user, handleAuthentication } : any) => {
  return (
    <View className='w-4/5 w-max-md bg-white p-4 rounded-lg'>
      <Text className='text-2xl mb-4 text-center'>Welcome</Text>
      <Text className='text-lg text-center mb-5'>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

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
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
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
