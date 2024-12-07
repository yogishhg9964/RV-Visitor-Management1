import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { VisitorFormData } from '../types/visitor';

export function VisitorRegistration() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [formData, setFormData] = useState<VisitorFormData>({
    address: '',
    contactNumber: '',
    vehicleNumber: '',
    purposeOfVisit: '',
    visitType: '',
  });

  function handleNext() {
    if (!formData.contactNumber || !formData.purposeOfVisit || !formData.visitType) {
      // Show error message
      return;
    }

    // Navigate to additional details screen instead of VisitorEntry
    navigation.navigate('VisitorAdditionalDetails', { formData });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter location/address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={styles.input}
      />
      {/* ... other form fields similar to above ... */}
      
      <Button 
        mode="contained"
        onPress={handleNext}
        style={styles.button}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    marginTop: 16,
  },
}); 