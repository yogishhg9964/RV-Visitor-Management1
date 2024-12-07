import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

import Auth from './screens/login';
import Dashboard from './DASHBOARD';

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigationRef.current?.navigate('Dashboard');
      }
    });
    return unsubscribe;
  }, []);

  return (
    
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }} // Hide header for Auth screen
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }} // Hide header for Dashboard
        />
      </Stack.Navigator>
   
  );
}
