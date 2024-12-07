import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VisitorRegistrationScreen } from '../screens/visitor-registration';
import { HostSelectionScreen } from '../screens/host-selection';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="VisitorRegistration" 
        component={VisitorRegistrationScreen} 
      />
      <Stack.Screen 
        name="HostSelection" 
        component={HostSelectionScreen} 
      />
    </Stack.Navigator>
  );
} 