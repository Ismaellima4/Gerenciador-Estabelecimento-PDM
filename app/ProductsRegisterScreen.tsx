import Button from "@/components/Button";
import CustomModal from "@/components/CustomModal";
import Input from "@/components/Input";
import InputPhoto from "@/components/InputPhoto";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ProductsRegisterScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const suppliers = [
    "Fornecedor 1",
    "Fornecedor 2",
    "Fornecedor 3",
    "Fornecedor 4",
    "Fornecedor 5",
  ];

  const handleSelectSupplier = (supplier: string) => {
    setSelectedSupplier(supplier);
    setIsModalVisible(false);
  };

  const handleImagePicked = (uri: string) => {
    setSelectedImage(uri);
  };

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
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={styles.textAboveInput}>Nome </Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        <Text style={styles.textAboveInput}>Descrição </Text>
        <Input onChangeText={handleInputChange} placeholder="Digite aqui..." />
        <Text style={styles.textAboveInput}>Imagem </Text>
        <InputPhoto onImageSelected={handleImagePicked} />{" "}
        {selectedImage && <Text>Imagem selecionada: {selectedImage}</Text>}
        <View>
          <Text style={styles.textAboveInput}>Fornecedor </Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Input
              onChangeText={handleInputChange}
              placeholder="Selecione um fornecedor"
              editable={false}
              value={selectedSupplier}
            />
          </TouchableOpacity>
          <CustomModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            title="Lista de Fornecedores"
          >
            <View>
              {suppliers.map((suppliers) => (
                <TouchableOpacity
                  key={suppliers}
                  onPress={() => handleSelectSupplier(suppliers)}
                >
                  <Text>{suppliers}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </CustomModal>
        </View>
        <View style={styles.containerMenor}>
          <View>
            <Text style={styles.textAboveInput}>Preço</Text>
            <Input onChangeText={handleInputChange} placeholder="R$ 0,00" />

            <Text style={styles.textAboveInput}>Quantidade em estoque</Text>
            <Input
              onChangeText={handleInputChange}
              placeholder="0 unidades"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.textAboveInput}>Categoria </Text>
            {/* Deve ser um modal */}

            <Text style={styles.textAboveInput}>Data de Validade </Text>
            <Input
              onChangeText={handleInputChange}
              placeholder="dd/mm/aaaa"
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.textAboveInput}>Codigo de barras </Text>
        <InputPhoto onImageSelected={handleImagePicked} />{" "}
        {selectedImage && <Text>Imagem selecionada: {selectedImage}</Text>}
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
  containerMenor: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
