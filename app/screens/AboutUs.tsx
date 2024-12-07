import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const navigation = useNavigation();

  const renderFeatureItem = (icon: string, title: string, description: string) => (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon as any} size={24} color={Colors.PRIMARY} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
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
          <Ionicons name="information-circle-outline" size={24} color={Colors.PRIMARY} />
          <Text style={styles.headerTitle}>About Us</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/images/rvce-gate.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.instituteName}>RV College of Engineering</Text>
          <Text style={styles.tagline}>Visitor Management System</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>
            RVCE's Visitor Management System is a state-of-the-art digital solution designed to 
            streamline and secure the visitor entry process at RV College of Engineering. Our system 
            ensures efficient tracking and management of all campus visitors while maintaining the 
            highest security standards.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {renderFeatureItem(
            'shield-checkmark-outline',
            'Enhanced Security',
            'Advanced visitor tracking and verification system'
          )}
          {renderFeatureItem(
            'flash-outline',
            'Quick Processing',
            'Streamlined check-in and check-out process'
          )}
          {renderFeatureItem(
            'notifications-outline',
            'Real-time Notifications',
            'Instant alerts to hosts about visitor arrivals'
          )}
          {renderFeatureItem(
            'analytics-outline',
            'Detailed Analytics',
            'Comprehensive visitor data and reporting'
          )}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>
              RV College of Engineering{'\n'}
              Mysore Road, RV Vidyaniketan Post{'\n'}
              Bengaluru - 560059{'\n'}
              Karnataka, India{'\n\n'}
              Email: principal@rvce.edu.in{'\n'}
              Phone: +91-80-67178020
            </Text>
          </View>
        </View>

        {/* Version */}
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
  logoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 16,
  },
  instituteName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
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

export default AboutUs; 