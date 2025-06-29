import FormActionButtons from "@/components/FormActionButton";
import { registerStyles } from "@/styles/registerStyles";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

export default function CustomerRegistration() {

     return (
      <SafeAreaView style={registerStyles.safeArea}>
        <ScrollView>
          <View style={registerStyles.container}>
            <View style={registerStyles.inputsWrapper}>
              <Text style={registerStyles.label}>Nome <Text style={registerStyles.required}>*</Text></Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Nome do cliente"
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>CPF</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="CPF"
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>Telefone <Text style={registerStyles.required}>*</Text></Text>
              <TextInput
                style={registerStyles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text style={registerStyles.label}>E-mail</Text>
              <TextInput
                style={registerStyles.input}
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