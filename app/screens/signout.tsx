// app/screens/SignOut.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth} from '../../FirebaseConfig';
import {signOut} from 'firebase/auth';
import { Alert } from 'react-native';

const handleLogout = async () => {
  await signOut(auth);
  Alert.alert('Logged out');
};

const SignOut = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to Sign Out?</Text>
      <Button title="Sign Out" onPress={handleLogout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  },
});

export default SignOut;
