import FormActionButtons from "@/components/FormActionButton";
import { addCustomer } from "@/store/customerSlice";
import { registerStyles } from "@/styles/registerStyles";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export default function CustomerRegistration() {

    const [customerName, setCustomerName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const handleSave = () => {
        if (!customerName || !phone) {
            Alert.alert("Erro", "Nome e telefone são obrigatórios.");
            return;
        }
        const newCustomer = {
            name: customerName,
            cpf,
            phone,
            email,
            payments: [],
        };

        dispatch(addCustomer(newCustomer));
        Alert.alert("Sucesso", "Cliente salvo!");
        router.back();
    };

     return (
      <SafeAreaView style={registerStyles.safeArea}>
        <ScrollView>
          <View style={registerStyles.container}>
            <View style={registerStyles.inputsWrapper}>
              <Text style={registerStyles.label}>Nome <Text style={registerStyles.required}>*</Text></Text>
              <TextInput
                style={registerStyles.input}
                placeholder="Nome do cliente"
                value={customerName}
                onChangeText={setCustomerName}
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>CPF</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />

              <Text style={registerStyles.label}>Telefone <Text style={registerStyles.required}>*</Text></Text>
              <TextInput
                style={registerStyles.input}
                value={phone}
                onChangeText={setPhone}
                maxLength={15}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />

              <Text style={registerStyles.label}>E-mail</Text>
              <TextInput
                style={registerStyles.input}
                placeholder="email@exemplo.com"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
                keyboardType="email-address"
              />
             
            </View>

            <FormActionButtons
                onSave={handleSave}
                onCancel={() => router.back()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
   
  );
}