import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ProductsRegisterScreen() {
  const handleSave = () => {
    // Implement save logic here
  };

  const handleCancel = () => {
    // Implement cancel logic here
  };

  const handleInputChange = (value: string) => {
    // Implement input change logic here
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textAboveInput}>Nome do Produto</Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        <Text style={styles.textAboveInput}>Descrição do Produto</Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        <Text style={styles.textAboveInput}>Preço do Produto</Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        <Text style={styles.textAboveInput}>Quantidade do Produto</Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        {/* <Text style={styles.textAboveInput}>Categoria do Produto</Text>
        <Input
          onChangeText={handleInputChange}
          placeholder="Digite aqui..."
        />
        <Text style={styles.textAboveInput}>Imagem do Produto</Text>
        <Input
          onChangeText={handleInputChange}
          placeholder="Digite aqui..."
        />
        <Text style={styles.textAboveInput}>Data de Validade do Produto</Text>
        <Input
          onChangeText={handleInputChange}
          placeholder="Digite aqui..."
        />
        <Text style={styles.textAboveInput}>Fornecedor do Produto</Text>
        <Input
          onChangeText={handleInputChange}
          placeholder="Digite aqui..."
        />
        <Text style={styles.textAboveInput}>Codigo de barras do produto</Text>
        <Input
          onChangeText={handleInputChange}
          placeholder="Digite aqui..."
        /> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSave}>
          <Text>Salvar</Text>
        </Button>
        <Button onPress={handleSave}>
          <Text>Cancelar</Text>
        </Button>
      </View>
    </View>
  );
}

export default ProductsRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
    padding: 20,
  },
  textAboveInput: {
    fontFamily: "lato",
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
});
