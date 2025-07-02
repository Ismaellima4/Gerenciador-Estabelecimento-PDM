import { registerStyles } from "@/styles/registerStyles";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";


export default function CustomersDetails() {

    const [isEditing, setIsEditing] = useState(false);


    const handleDelete = () => {
       
         Alert.alert('Removido', 'Fornecedor excluído com sucesso!');

        //falta implementar a lógica de exclusão
    }

    const handleUpdate = () => {
        setIsEditing(!isEditing);

         Alert.alert('Sucesso', 'Fornecedor atualizado com sucesso!');
        //falta implementar a lógica de atualização

    }

    return (
    <SafeAreaView style={registerStyles.safeArea}>
    
        <ScrollView contentContainerStyle={registerStyles.container}>

          <View style={styles.box}>
            <Text style={styles.text}>NOME</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.text}>DADO SENSIVEL</Text>
          </View>
    
          <View style={styles.box}>
            <Text style={styles.text}>00-00-00-00</Text>
          </View>
          
          <View style={styles.box}>
            <Text style={styles.text}>exemplo@gmail.com</Text>
          </View>

           <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                 <Text style={styles.buttonText}>{isEditing ? 'SALVAR' : 'EDITAR'}</Text>
              </TouchableOpacity>
                {!isEditing && (
                    <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>DELETAR</Text>
                    </TouchableOpacity>
                )}
           </View>

        </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({

  box: {
    width: '85%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
   buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginTop: 20,
    width: '85%',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 7.5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  
});