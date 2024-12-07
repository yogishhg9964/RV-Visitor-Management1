import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch,
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(true);

  const renderSettingItem = (
    icon: string, 
    title: string, 
    value?: boolean, 
    onValueChange?: (newValue: boolean) => void,
    showArrow: boolean = true
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={() => !onValueChange && console.log(title + ' pressed')}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={24} color={Colors.PRIMARY} />
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      {onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: Colors.PRIMARY }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        showArrow && <Ionicons name="chevron-forward" size={24} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="settings-outline" size={24} color={Colors.PRIMARY} />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem('person-outline', 'Edit Profile')}
          {renderSettingItem('key-outline', 'Change Password')}
          {renderSettingItem('mail-outline', 'Email Preferences')}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          {renderSettingItem(
            'moon-outline',
            'Dark Mode',
            isDarkMode,
            setIsDarkMode,
            false
          )}
          {renderSettingItem(
            'notifications-outline',
            'Notifications',
            isNotificationsEnabled,
            setIsNotificationsEnabled,
            false
          )}
          {renderSettingItem(
            'location-outline',
            'Location Services',
            isLocationEnabled,
            setIsLocationEnabled,
            false
          )}
        </View>

        {/* More Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          {renderSettingItem('help-circle-outline', 'Help & Support')}
          {renderSettingItem('document-text-outline', 'Terms & Conditions')}
          {renderSettingItem('shield-checkmark-outline', 'Privacy Policy')}
          {renderSettingItem('information-circle-outline', 'About')}
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  versionInfo: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Settings; 