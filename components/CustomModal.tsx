import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  items?: string[];
  onSelect?: (item: string) => void;
};

const CustomModal = ({
  visible,
  onClose,
  title,
  items = [],
  onSelect,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={styles.scrollContainer}>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => onSelect && onSelect(item)}
                style={styles.itemButton}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.actionButton}>
              <Text style={styles.actionText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.actionButton}>
              <Text style={styles.actionText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    width: "100%",
    maxHeight: 200,
    marginBottom: 10,
    backgroundColor: "#C9C9C9",
    borderRadius: 10,
  },
  itemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    fontSize: 16,
    color: "black",
  },
});
