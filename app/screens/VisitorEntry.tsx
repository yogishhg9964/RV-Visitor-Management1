import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';


const VisitorEntry = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    vehicle: '',
    purpose: '',
    visitType: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    contact: '',
    purpose: '',
    visitType: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      contact: '',
      purpose: '',
      visitType: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Enter valid 10-digit number';
      isValid = false;
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
      isValid = false;
    }

    if (!formData.visitType) {
      newErrors.visitType = 'Visit type is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Navigate to next screen with form data
      console.log('Form data:', formData);
    }
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
          <Ionicons name="person" size={24} color={Colors.PRIMARY} />
          <Text style={styles.headerTitle}>Visitor Registration</Text>
        </View>
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name of Visitor*</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Enter full name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        {/* Address Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location/address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
        </View>

        {/* Contact Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Number*</Text>
          <TextInput
            style={[styles.input, errors.contact && styles.inputError]}
            placeholder="Enter contact number"
            keyboardType="numeric"
            maxLength={10}
            value={formData.contact}
            onChangeText={(text) => setFormData({ ...formData, contact: text })}
          />
          {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}
        </View>

        {/* Vehicle Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Number (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter vehicle number"
            value={formData.vehicle}
            onChangeText={(text) => setFormData({ ...formData, vehicle: text })}
          />
        </View>

        {/* Purpose Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Purpose of Visit*</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.purpose && styles.inputError]}
            placeholder="Enter the purpose of the visit"
            multiline
            numberOfLines={3}
            value={formData.purpose}
            onChangeText={(text) => setFormData({ ...formData, purpose: text })}
          />
          {errors.purpose ? <Text style={styles.errorText}>{errors.purpose}</Text> : null}
        </View>

        {/* Visit Type Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type of Visit*</Text>
          <View style={[styles.pickerContainer, errors.visitType && styles.inputError]}>
            <Picker
              selectedValue={formData.visitType}
              onValueChange={(value) => setFormData({ ...formData, visitType: value })}
              style={styles.picker}
            >
              <Picker.Item label="Select visit type" value="" />
              <Picker.Item label="Official" value="official" />
              <Picker.Item label="Personal" value="personal" />
            </Picker>
          </View>
          {errors.visitType ? <Text style={styles.errorText}>{errors.visitType}</Text> : null}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    color: Colors.PRIMARY,
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  nextButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VisitorEntry;
