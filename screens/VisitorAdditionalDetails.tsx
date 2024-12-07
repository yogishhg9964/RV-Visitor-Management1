import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text, Checkbox, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { DEPARTMENTS, DOCUMENT_TYPES } from '../constants/departments';
import { AdditionalDetailsFormData, VisitorFormData } from '../types/visitor';
import { CustomDropDown } from '../components/CustomDropDown';

export function VisitorAdditionalDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const previousFormData = route.params?.formData as VisitorFormData;

  const [formData, setFormData] = useState<AdditionalDetailsFormData>({
    whomToMeet: '',
    department: '',
    documentType: '',
    selectedStaff: '',
    sendNotification: true,
  });

  async function handleDocumentUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFormData(prev => ({ ...prev, documentUri: result.uri }));
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }

  function handleSubmit() {
    // Validate form
    if (!formData.whomToMeet || !formData.department || !formData.documentType) {
      // Show error message
      return;
    }

    // Combine with previous form data and submit
    const completeFormData = {
      ...previousFormData,
      ...formData,
    };

    // Navigate to success screen
    navigation.navigate('VisitorSuccess', { formData: completeFormData });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Additional Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <CustomDropDown
          label="Whom to Meet"
          value={formData.whomToMeet}
          onValueChange={(value) => setFormData(prev => ({ ...prev, whomToMeet: value }))}
          items={[
            { label: 'Dr. Smith', value: 'dr_smith' },
            { label: 'Mr. John', value: 'mr_john' },
            // ... more items
          ]}
        />

        <CustomDropDown
          label="Department"
          value={formData.department}
          onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
          items={DEPARTMENTS.map(dept => ({ label: dept, value: dept.toLowerCase() }))}
        />

        <CustomDropDown
          label="Document Type"
          value={formData.documentType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}
          items={DOCUMENT_TYPES.map(type => ({ label: type, value: type.toLowerCase() }))}
        />

        <Button
          mode="outlined"
          onPress={handleDocumentUpload}
          icon="file-upload"
          style={styles.uploadButton}
        >
          Upload Document
        </Button>

        <CustomDropDown
          label="Select Staff"
          value={formData.selectedStaff}
          onValueChange={(value) => setFormData(prev => ({ ...prev, selectedStaff: value }))}
          items={[
            { label: 'Mr. Raj', value: 'mr_raj' },
            { label: 'Ms. Anjali', value: 'ms_anjali' },
            // ... more items
          ]}
        />

        <Checkbox.Item
          label="Send notification to host for approval"
          status={formData.sendNotification ? 'checked' : 'unchecked'}
          onPress={() => setFormData(prev => ({ 
            ...prev, 
            sendNotification: !prev.sendNotification 
          }))}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  uploadButton: {
    marginVertical: 16,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 32,
  },
}); 