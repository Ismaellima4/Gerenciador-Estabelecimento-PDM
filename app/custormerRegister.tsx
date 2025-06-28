import FormActionButtons from "@/components/FormActionButton";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet } from "react-native";

export default function CustomerRegistration() {

     return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputsWrapper}>
              <Text style={styles.label}>Nome *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do cliente"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>Telefone *</Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
              />
             
            </View>

            <FormActionButtons
                onSave={() => console.log("Salvar cliente")}
                onCancel={() => console.log("Cancelar cadastro")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputsWrapper: {
    flexGrow: 1,
    marginBottom: 150,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 13,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
});
