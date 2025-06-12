import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Alert
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
  onDeleteItem?: (item: string) => void;
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
  onDeleteItem,
}: ModalSelectorProps) {
  const [name, setName] = useState('');

  const handleAddItem = () => {
    if (name.trim()) {
      onAddSubmit?.(name.trim());
      setName('');
    }
  };

  const handleDeleteItem = (itemToDelete: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a categoria "${itemToDelete}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => onDeleteItem?.(itemToDelete),
          style: 'destructive',
        },
      ]
    );
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
              <View style={styles.optionItemContainer}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => onSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
                {onDeleteItem && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteItem(item)}
                  >
                    <AntDesign name="delete" size={20} color="black" />
                  </TouchableOpacity>
                )}
              </View>
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 15,
    color: '#333',
  },
  optionsList: {
    width: '100%',
    maxHeight: '45%',
    marginBottom: 15,
  },
  optionsListContent: {
    flexGrow: 1,
  },
  optionItemContainer: { // Estilo para o contêiner do item e do botão de exclusão
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8, // Ajuste para dar espaço aos botões
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  optionItem: {
    flex: 1, // Permite que o texto da categoria ocupe o espaço disponível
    paddingRight: 10, // Espaço entre o texto e o botão de exclusão
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 5,
    // Opcional: Adicione um fundo para o botão se desejar
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  addInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
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
    marginTop: 15,
    backgroundColor: '#000',
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