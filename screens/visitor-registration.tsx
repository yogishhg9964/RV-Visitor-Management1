import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function VisitorRegistrationScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    vehicleNumber: '',
    purposeOfVisit: '',
    typeOfVisit: 'Personal',
  });

  const handleNext = () => {
    // Simple validation
    if (!formData.name || !formData.contactNumber || !formData.purposeOfVisit) {
      alert('Please fill in all required fields');
      return;
    }

    navigation.navigate('HostSelection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          placeholder="Name of Visitor*"
          style={styles.input}
        />
        <TextInput
          value={formData.address}
          onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
          placeholder="Address"
          style={styles.input}
        />
        <TextInput
          value={formData.contactNumber}
          onChangeText={(text) => setFormData(prev => ({ ...prev, contactNumber: text }))}
          placeholder="Contact Number*"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={formData.vehicleNumber}
          onChangeText={(text) => setFormData(prev => ({ ...prev, vehicleNumber: text }))}
          placeholder="Vehicle Number (Optional)"
          style={styles.input}
        />
        <TextInput
          value={formData.purposeOfVisit}
          onChangeText={(text) => setFormData(prev => ({ ...prev, purposeOfVisit: text }))}
          placeholder="Purpose of Visit*"
          style={styles.input}
          multiline
        />
      </View>
      
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#6B46C1',
    margin: 16,
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 