import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";


export const Search = () => {
    return (
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Buscar" placeholderTextColor="#888" />
        <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="#888" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    );
}


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },    
    menuIcon: {
        marginLeft: 8,
    },
});