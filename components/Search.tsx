import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { HasId } from '@/store/genericThunk';

interface SearchProps<T extends HasId> {
  items: T[];
  searchBy: keyof T;
  getDetailsPath: (item: T) => string;
}

export function Search<T extends HasId>({
  items,
  searchBy,
  getDetailsPath,
}: SearchProps<T>) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      setModalVisible(false);
      return;
    }

    const filtered = items.filter((item) => {
      const value = item[searchBy];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(query.toLowerCase())
      );
    });

    setResults(filtered);
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color="#888"
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Itens Encontrados</Text>

            <FlatList
              data={results}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Link
                  href={{
                    pathname: getDetailsPath(item),
                    params: { id: item.id },
                  }}
                  asChild
                >
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalText}>
                      {String(item[searchBy])}
                    </Text>
                  </TouchableOpacity>
                </Link>
              )}
            />

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#aaa', marginTop: 8 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}



const styles = StyleSheet.create({
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 6,
    marginVertical: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
  menuIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
