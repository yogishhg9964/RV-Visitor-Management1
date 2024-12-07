import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { auth, googleProvider } from '../../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import Dashboard from '../DASHBOARD'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: ''
    };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Additional validations for signup
    if (!isLogin) {
      if (!Name) {
        newErrors.name = 'Name is required';
        isValid = false;
      }

      if (!phone) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Enter valid 10-digit phone number';
        isValid = false;
      }

      if (!address) {
        newErrors.address = 'Address is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        if (!email || !password) {
          Alert.alert('Error', 'Please enter email and password');
          return;
        }
        try {
          await signInWithEmailAndPassword(auth, email, password);
          Alert.alert('Success', 'Login Successful');
        } catch (error: any) {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Error', 'Invalid email address');
              break;
            case 'auth/user-not-found':
              Alert.alert('Error', 'No user found with this email');
              break;
            case 'auth/wrong-password':
              Alert.alert('Error', 'Incorrect password');
              break;
            default:
              Alert.alert('Error', error.message);
          }
          return;
        }
      } else {
        // Signup validation
        if (!Name || !phone || !address || !email || !password) {
          Alert.alert('Error', 'All fields are required');
          return;
        }

        // Phone validation
        if (!/^\d{10}$/.test(phone)) {
          Alert.alert('Error', 'Please enter a valid 10-digit phone number');
          return;
        }

        // Email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
          Alert.alert('Error', 'Please enter a valid email address');
          return;
        }

        // Password validation
        if (password.length < 6) {
          Alert.alert('Error', 'Password must be at least 6 characters long');
          return;
        }

        try {
          await createUserWithEmailAndPassword(auth, email, password);
          Alert.alert('Success', 'Registration Successful');
        } catch (error: any) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Error', 'Email already registered');
              break;
            case 'auth/invalid-email':
              Alert.alert('Error', 'Invalid email address');
              break;
            case 'auth/operation-not-allowed':
              Alert.alert('Error', 'Email/password accounts are not enabled');
              break;
            case 'auth/weak-password':
              Alert.alert('Error', 'Password is too weak');
              break;
            default:
              Alert.alert('Error', error.message);
          }
          return;
        }
      }

      // Clear form only on success
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setAddress('');
      setErrors({
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
      });
    } catch (error: any) {
      console.error('Authentication error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Alert.alert(
        'Success',
        'Google Sign-In Successful',
        [{ text: 'OK', onPress: () => console.log('Google sign-in successful') }]
      );
    } catch (err: any) {
      Alert.alert(
        'Error',
        err.message || 'Failed to sign in with Google',
        [{ text: 'OK', onPress: () => console.log('Error alert closed') }]
      );
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    Alert.alert('Logged out');
  };

  if (user) {
    return (
      <Dashboard />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.welcomeText}>RVCE Visitor Management System</Text>
        <Text style={styles.subHeader}>Sign in to Continue</Text>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.header}>{isLogin ? 'Login' : 'Signup'}</Text>
        
        {!isLogin && (
          <>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your Full Name"
              value={Name}
              onChangeText={(text) => setName(text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Enter your Phone Number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              placeholder="Enter your Address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          </>
        )}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAuth} style={styles.loginButton}>
          <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.loginButtonText}>{isLogin ? 'LOGIN' : 'SIGN UP'}</Text>
        </TouchableOpacity>
        <Text onPress={() => setIsLogin(!isLogin)} style={styles.toggleText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
        {isLogin && (
          <>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
          <Ionicons name="logo-google" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
          </>
        )}

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  topSection: {
    height: 100, // Reduced from 120
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25, // Reduced from 30
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Reduced from 15
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18, // Reduced from 20
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4, // Reduced from 5
  },
  subHeader: {
    color: '#fff',
    fontSize: 12, // Reduced from 14
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 19, // Reduced from 20
    marginTop: 10, // Reduced from 15
    borderRadius: 15, // Reduced from 20
    padding: 15, // Reduced from 15
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    fontSize: 20, // Reduced from 22
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 12, // Reduced from 15
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,//'#ddd',
    borderRadius: 15, // Reduced from 20
    padding: 8, // Reduced from 12
    marginBottom: 8, // Reduced from 12
    fontSize: 13, // Reduced from 14
    backgroundColor: '#f8f9fa',
    height: 40, // Reduced from 45
  },
  linkButton: {
    alignSelf: 'flex-end',
    marginBottom: 8, // Reduced from 12
    marginTop: -6, // Reduced from -8
  },
  linkText: {
    color: '#8e44ad',
    fontSize: 11, // Reduced from 12
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 6,
    fontSize: 11,
  },
  googleButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
    height: 38,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#8e44ad',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 11,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginLeft: 4,
    marginTop: -4,
    marginBottom: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
});

export default Auth;
