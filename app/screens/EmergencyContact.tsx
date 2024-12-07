import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

interface EmergencyContactItem {
  title: string;
  role?: string;
  phone: string;
  icon: string;
  category: string;
}

const emergencyContacts: EmergencyContactItem[] = [
  // Security Contacts
  {
    title: 'Main Gate Security',
    phone: '+91-8867073161',
    icon: 'shield-checkmark',
    category: 'Security'
  },
  {
    title: 'Security Officer',
    role: 'Mr. Manjunath',
    phone: '+91-9880977622',
    icon: 'shield',
    category: 'Security'
  },

  // Medical Contacts
  {
    title: 'Health Center',
    phone: '+91-80-67178021',
    icon: 'medical',
    category: 'Medical'
  },
  {
    title: 'Ambulance',
    phone: '108',
    icon: 'fitness',
    category: 'Medical'
  },

  // Administrative Contacts
  {
    title: 'Principal Office',
    role: 'Dr. K N Subramanya',
    phone: '+91-80-67178020',
    icon: 'business',
    category: 'Administrative'
  },
  {
    title: 'Administrative Office',
    phone: '+91-80-67178018',
    icon: 'briefcase',
    category: 'Administrative'
  },

  // Emergency Services
  {
    title: 'Police',
    phone: '100',
    icon: 'call',
    category: 'Emergency Services'
  },
  {
    title: 'Fire Station',
    phone: '101',
    icon: 'flame',
    category: 'Emergency Services'
  },
];

const EmergencyContact = () => {
  const navigation = useNavigation();

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderContactCard = (contact: EmergencyContactItem) => (
    <TouchableOpacity 
      key={contact.title}
      style={styles.contactCard}
      onPress={() => handleCall(contact.phone)}
    >
      <View style={styles.contactIconContainer}>
        <Ionicons name={contact.icon as any} size={24} color={Colors.PRIMARY} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{contact.title}</Text>
        {contact.role && (
          <Text style={styles.contactRole}>{contact.role}</Text>
        )}
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
      <View style={styles.callButton}>
        <Ionicons name="call-outline" size={24} color={Colors.PRIMARY} />
      </View>
    </TouchableOpacity>
  );

  const renderContactSection = (category: string) => {
    const categoryContacts = emergencyContacts.filter(
      contact => contact.category === category
    );

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{category}</Text>
        {categoryContacts.map(renderContactCard)}
      </View>
    );
  };

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
          <Ionicons name="call" size={24} color={Colors.PRIMARY} />
          <Text style={styles.headerTitle}>Emergency Contacts</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {renderContactSection('Security')}
        {renderContactSection('Medical')}
        {renderContactSection('Administrative')}
        {renderContactSection('Emergency Services')}
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  contactRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: Colors.PRIMARY,
    marginTop: 2,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyContact; 