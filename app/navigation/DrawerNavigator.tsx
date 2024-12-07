import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Tabs from '../Tabs';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import AboutUs from '../screens/AboutUs';
import EmergencyContact from '../screens/EmergencyContact';
import { Colors } from '@/constants/Colors';
import { auth } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully');
      props.navigation.navigate('Auth');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        {/* Regular drawer items */}
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </View>

        {/* Sign Out button at bottom */}
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={handleLogout}
        >
          <View style={styles.signOutContent}>
            <Ionicons 
              name="log-out-outline" 
              size={22} 
              color="#FF6B6B" 
            />
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.PRIMARY,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerItemStyle: {
          borderRadius: 8,
          paddingVertical: 2,
          marginVertical: 4,
          marginHorizontal: 8,
        },
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: -10,
        },
      }}>
      <Drawer.Screen
        name="HomeDrawer"
        component={Tabs}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color === '#fff' ? Colors.PRIMARY : '#F3F0FF' }]}>
              <Ionicons name="home-outline" size={22} color={color === '#fff' ? '#fff' : Colors.PRIMARY} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color === '#fff' ? Colors.PRIMARY : '#F3F0FF' }]}>
              <Ionicons name="person-outline" size={22} color={color === '#fff' ? '#fff' : Colors.PRIMARY} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color === '#fff' ? Colors.PRIMARY : '#F3F0FF' }]}>
              <Ionicons name="settings-outline" size={22} color={color === '#fff' ? '#fff' : Colors.PRIMARY} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          drawerLabel: 'About Us',
          drawerIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color === '#fff' ? Colors.PRIMARY : '#F3F0FF' }]}>
              <Ionicons name="information-circle-outline" size={22} color={color === '#fff' ? '#fff' : Colors.PRIMARY} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="EmergencyContact"
        component={EmergencyContact}
        options={{
          drawerLabel: 'Emergency Contact',
          drawerIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color === '#fff' ? Colors.PRIMARY : '#F3F0FF' }]}>
              <Ionicons name="call-outline" size={22} color={color === '#fff' ? '#fff' : Colors.PRIMARY} />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  signOutButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop:215,
    
  },
  signOutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  signOutText: {
    fontSize: 15,
    color: '#FF6B6B',
    marginLeft: 32,
  },
}); 