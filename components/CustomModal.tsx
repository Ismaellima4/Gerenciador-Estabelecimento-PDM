import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContenet}>
          <Text style={styles.textButton}>{title}</Text>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.textButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  button: {},
  textButton: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContenet: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});
