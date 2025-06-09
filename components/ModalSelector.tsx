import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface ModalSelectorProps {
  visible: boolean;
  onClose: () => void;
  options: string[];
  onSelect: (item: string) => void;
  title: string;
  showAddInput: boolean;
  onAddSubmit?: (newItem: string) => void;
  onAddPress?: () => void;
  placeholder?: string;
  selectText?: string;
  addInputLabel?: string;
}

export default function ModalSelector({
  visible,
  onClose,
  options,
  onSelect,
  title,
  showAddInput,
  onAddSubmit,
  onAddPress,
  placeholder,
  selectText,
  addInputLabel,
}: ModalSelectorProps) {
  const [name, setName] = useState('');

  const handleAddItem = () => {
    if (name.trim()) {
      onAddSubmit?.(name.trim());
      setName('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>

          {selectText && <Text style={styles.sectionLabel}>{selectText}</Text>}
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>Nenhum item disponível.</Text>
            )}
            style={styles.optionsList}
            contentContainerStyle={styles.optionsListContent}
          />

          {showAddInput ? (
            <>
              {addInputLabel && <Text style={styles.sectionLabel}>{addInputLabel}</Text>}
              <View style={styles.addInputContainer}>
                <TextInput
                  style={styles.addInput}
                  placeholder={placeholder || "Adicionar novo item"}
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                  <AntDesign name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity style={styles.addNewButton} onPress={onAddPress}>
              <AntDesign name="pluscircleo" size={20} color="#fff" />
              <Text style={styles.addNewButtonText}>Adicionar Novo</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sectionLabel: { // New style for "Selecione uma categoria" and "Adicione uma categoria"
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Align to the left
    marginBottom: 8,
    marginTop: 15, // Add some top margin to separate from title/list
    color: '#333',
  },
  optionsList: {
    width: '100%',
    maxHeight: '45%', // Adjusted to make space for new labels and input
    marginBottom: 15,
  },
  optionsListContent: {
    flexGrow: 1,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  addInputContainer: {
    flexDirection: 'row',
    marginTop: 10, // Adjusted margin
    width: '100%',
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#000', // Changed to black
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewButton: {
    flexDirection: 'row',
    backgroundColor: '#000', // Changed to black
    padding: 12,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addNewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelButton: {
    marginTop: 15, // Adjusted margin
    backgroundColor: '#000', // Changed to black
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});