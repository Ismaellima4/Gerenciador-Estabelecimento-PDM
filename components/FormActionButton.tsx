// src/components/FormActionButtons.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FormActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  saveText?: string;
  cancelText?: string;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  onSave,
  onCancel,
  saveText = 'Salvar', 
  cancelText = 'Cancelar', 
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.buttonText}>{saveText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.buttonText}>{cancelText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#000', // Black background for Save
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#000', // Black background for Cancel
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormActionButtons;