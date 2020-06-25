
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/welcome';
import Login from './components/login';
import Signup from './components/signup';
import Main from './components/main';
import Card from './components/card';
import Svaed from './components/saved';

import firebase from './db';

if (firebase.apps.length === 0) {
  firebase.initializeApp({});
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#A51E24',
        headerTitleStyle: {
          // fontWeight: 'bold',
          fontSize:20
        },
      }}>
        <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{ title: 'Welcome' }}
      /> 
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Sign up' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Log in'}

        }
      />
      <Stack.Screen 
       name="Main" 
       component={Main} 
       options={
         { title: 'Main' }       }
      />
      <Stack.Screen 
       name="Card" 
       component={Card} 
       options={
         { title: 'Main page' }
       }
      />
      {/* <Stack.Screen 
       name="Saved" 
       component={Saved} 
       options={
         { title: 'Saved meals' },
       }
      /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}