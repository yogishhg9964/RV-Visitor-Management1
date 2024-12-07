import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { Colors } from '@/constants/Colors';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  
  const images = [
    require('@/assets/images/rvce-gate.jpg'),
    require('@/assets/images/rvce-campus.jpg'),
    require('@/assets/images/rvce-building.jpg'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <Carousel
            loop
            width={width}
            height={width * 0.4}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({ item }) => (
              <View style={styles.slideItem}>
                <Image
                  source={item}
                  style={styles.slideImage}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>

        {/* First Row - Quick Check-In and Cab Entry */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.card, styles.cardHalf]}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3F0FF' }]}>
              <Ionicons name="flash" size={24} color={Colors.PRIMARY} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Quick Check-In</Text>
              <Text style={styles.cardDescription}>Fast track entry</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.cardHalf]}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3F0FF' }]}>
              <Ionicons name="car" size={24} color={Colors.PRIMARY} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Cab Entry</Text>
              <Text style={styles.cardDescription}>Register cab</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Second Row - Approval Status and Today's Visitors */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.card, styles.cardHalf]}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3F0FF' }]}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.PRIMARY} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Approval Status</Text>
              <Text style={styles.cardDescription}>View pending requests</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: Colors.PRIMARY }]}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.cardHalf]}>
            <View style={[styles.iconContainer, { backgroundColor: '#F3F0FF' }]}>
              <Ionicons name="people" size={24} color={Colors.PRIMARY} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Today's Visitors</Text>
              <Text style={styles.cardDescription}>Total: 15</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  sliderContainer: {
    height: Dimensions.get('window').width * 0.4,
    marginVertical: 20,
  },
  slideItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative', // For badge positioning
  },
  cardHalf: {
    width: '48%', // Slightly less than 50% to account for spacing
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#D10000',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
