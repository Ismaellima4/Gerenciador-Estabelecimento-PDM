import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For the profile picture placeholder icon

// Import the new component
import InfoDisplayBox from '@/components/InfoDisPlayBox'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuppliersDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicturePlaceholder}>
            <MaterialCommunityIcons name="image" size={60} color="black" />
          </View>
        </View>

        {/* Using the reusable InfoDisplayBox component */}
        <InfoDisplayBox text="Nome do fornecedor" />
        <InfoDisplayBox text="CPF/CPNJ" />
        <InfoDisplayBox text="(00) 00000-0000" />
        <InfoDisplayBox text="Endereço" />
        <InfoDisplayBox text="email@seudominio.com" />

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          </Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    position: 'relative',
  },
  backButton: {
    padding: 10,
  },
  statusDot: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -5 }],
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePictureContainer: {
    marginBottom: 30,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  descriptionBox: {
    width: '85%',
    backgroundColor: '#e0e0e0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    minHeight: 120,
    justifyContent: 'flex-start',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  editButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: '7.5%',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});