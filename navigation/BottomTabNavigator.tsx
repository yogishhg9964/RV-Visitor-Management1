import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { VisitorRegistration } from '../screens/VisitorRegistration';
import { VisitorLog } from '../screens/VisitorLog';
import { More } from '../screens/More';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="VisitorEntry" 
        component={VisitorRegistration}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-add" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="VisitorLog" 
        component={VisitorLog}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="More" 
        component={More}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="more-horiz" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 