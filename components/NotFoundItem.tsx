import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const NotFoundItem = () => {
   return (
    <SafeAreaView style={styles.container}>
        <View style={styles.centeredMessage}>
            <Text style={styles.errorMessage}>Produto não encontrado.</Text>
            <TouchableOpacity style={styles.backButton} onPress={router.back}>
                <Text style={styles.backButtonText}>Voltar para a lista</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20, 
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  },
});


export default NotFoundItem;