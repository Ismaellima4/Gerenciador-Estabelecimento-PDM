import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    pathname: string;
}

export const AddButton = ({ pathname }: ButtonProps) => (
    <Link href={pathname} asChild>
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>ADICIONAR</Text>
        </TouchableOpacity>
    </Link>
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