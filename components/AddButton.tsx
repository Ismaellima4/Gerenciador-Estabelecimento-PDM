import { StyleSheet, Text, TouchableOpacity } from "react-native";


export const AddButton = () => (
    <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>ADICIONAR</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});