import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { VisitorRegistration } from '../screens/VisitorRegistration';
import { VisitorEntry } from '../screens/VisitorEntry';
import { VisitorLog } from '../screens/VisitorLog';
import { VisitorAdditionalDetails } from '../screens/VisitorAdditionalDetails';
import { VisitorSuccess } from '../screens/VisitorSuccess';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="VisitorRegistration" 
          component={VisitorRegistration}
          options={{ title: 'Visitor Registration' }}
        />
        <Stack.Screen 
          name="VisitorEntry" 
          component={VisitorEntry} 
          options={{ title: 'Visitor Entry' }}
        />
        <Stack.Screen 
          name="VisitorLog" 
          component={VisitorLog}
          options={{ title: 'Visitor Log' }}
        />
        <Stack.Screen 
          name="VisitorAdditionalDetails" 
          component={VisitorAdditionalDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="VisitorSuccess" 
          component={VisitorSuccess}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 