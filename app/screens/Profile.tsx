// app/screens/Profile.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../FirebaseConfig';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';



const Profile = () => {
  const navigation = useNavigation();
  
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton} >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="person" size={24} color={Colors.PRIMARY} />
          <Text style={styles.headerTitle}>Profile </Text>
        </View>
      </View>
      {/*<TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>*/}

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          {user?.photoURL ? (
            <Image 
              source={{ uri: user.photoURL }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={styles.defaultAvatar}>
              <Text style={styles.avatarText}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <View style={styles.onlineIndicator} />
        </View>
        
        {user && (
          <View>
            <Text style={styles.userName}>Welcome, {user.displayName || user.email}</Text>
            <Text style={styles.balance}>$235</Text>
          </View>
        )}
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Profile Details</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="location-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Addresses</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          <Text style={[styles.optionText, styles.logoutText]}>Exit</Text>
          <Ionicons name="chevron-forward" size={24} color="#FF6B6B" style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor:Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  balance: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#FF6B6B',
  },
  chevron: {
    marginLeft: 'auto',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:0
  },
});

export default Profile;
