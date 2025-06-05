import Button from "@/components/Button";
import CustomModal from "@/components/CustomModal";
import Input from "@/components/Input";
import InputPhoto from "@/components/InputPhoto";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ProductsRegisterScreen() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    expiryDate: "",
    selectedSupplier: "",
    selectedCategory: "",
  });
  const [productImageUri, setProductImageUri] = useState<string | null>(null);
  const [barcodeImageUri, setBarcodeImageUri] = useState<string | null>(null);
  const [isModalSuppliersVisible, setIsModalSuppliersVisible] = useState(false);
  const [isModalCategoryVisible, setIsModalCategoryVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCancel = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      expiryDate: "",
      selectedSupplier: "",
      selectedCategory: "",
    });
    setProductImageUri(null);
    setBarcodeImageUri(null);
    setSelectedSupplier("");
    setSelectedCategory("");
    setIsModalSuppliersVisible(false);
    setIsModalCategoryVisible(false);
    console.log("Formulário cancelado e limpo.");
  };

  const suppliers = [
    "Fornecedor 1",
    "Fornecedor 2",
    "Fornecedor 3",
    "Fornecedor 4",
    "Fornecedor 5",
    "Fornecedor 6",
    "Fornecedor 7",
    "Fornecedor 8",
    "Fornecedor 9",
    "Fornecedor 10",
  ];

  const categories = [
    "Categoria 1",
    "Categoria 2",
    "Categoria 3",
    "Categoria 4",
    "Categoria 5",
    "Categoria 6",
    "Categoria 7",
    "Categoria 8",
    "Categoria 9",
    "Categoria 10",
  ];

  const handleSelectSupplier = (supplier: string) => {
    setSelectedSupplier(supplier);
    setIsModalSuppliersVisible(false);
  };

  const handleSelectCategorie = (categorie: string) => {
    setSelectedCategory(categorie);
    setIsModalCategoryVisible(false);
  };

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleProductImagePicked = (uri: string) => {
    setProductImageUri(uri);
  };

  const handleBarcodeImagePicked = (uri: string) => {
    setBarcodeImageUri(uri);
  };

  const handleSave = () => {
    console.log("Produto salvo com os dados:");
    console.log({
      ...form,
      productImageUri,
      barcodeImageUri,
      selectedSupplier,
      selectedCategory,
    });
  };

  const handleVoltar = () => {
    // Aqui você pode implementar a lógica para voltar à tela anterior
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.textAboveInput}>Nome</Text>
        <Input
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="Digite aqui..."
          value={form.name}
        />
        <Text style={styles.textAboveInput}>Descrição </Text>
        <Input
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Digite aqui..."
          value={form.description}
        />
        <View style={styles.imageContainer}>
          <Text style={styles.textAboveInput}>Imagem</Text>
          <View style={styles.inputPhotoWrapper}>
            <InputPhoto
              imageUri={productImageUri}
              onClear={() => setProductImageUri(null)}
              onImageSelected={handleProductImagePicked}
            />
          </View>
          {productImageUri && (
            <Text style={styles.textImage}>Imagem adicionada com sucesso!</Text>
          )}
        </View>
        <View>
          <Text style={styles.textAboveInput}>Fornecedor </Text>
          <TouchableOpacity onPress={() => setIsModalSuppliersVisible(true)}>
            <Input
              onChangeText={(value) =>
                handleInputChange("selectedSupplier", value)
              }
              placeholder="Selecione um fornecedor"
              editable={false}
              value={selectedSupplier}
            />
          </TouchableOpacity>
          <CustomModal
            visible={isModalSuppliersVisible}
            onClose={() => setIsModalSuppliersVisible(false)}
            title="Fornecedores disponíveis"
            items={suppliers}
            onSelect={(supplier) => {
              handleSelectSupplier(supplier);
            }}
          />
        </View>
        <View style={styles.containerMenor}>
          <View>
            <Text style={styles.textAboveInput}>Preço</Text>
            <Input
              onChangeText={(value) => handleInputChange("price", value)}
              placeholder="R$ 0,00"
              value={form.price}
              keyboardType="numeric"
            />

            <Text style={styles.textAboveInput}>Quantidade em estoque</Text>
            <Input
              onChangeText={(value) =>
                handleInputChange("stockQuantity", value)
              }
              placeholder="0 unidades"
              value={form.stockQuantity}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.textAboveInput}>Categoria </Text>
            <TouchableOpacity onPress={() => setIsModalCategoryVisible(true)}>
              <Input
                onChangeText={(value) =>
                  handleInputChange("selectedCategory", value)
                }
                placeholder="Selecione uma categoria"
                editable={false}
                value={selectedCategory}
                // value={form.selectedCategory}
              />
            </TouchableOpacity>
            <CustomModal
              visible={isModalCategoryVisible}
              onClose={() => setIsModalCategoryVisible(false)}
              title="Categorias Disponíveis"
              items={categories}
              onSelect={(categories) => {
                handleSelectCategorie(categories);
              }}
            />
            <Text style={styles.textAboveInput}>Data de Validade </Text>
            <Input
              onChangeText={(value) => handleInputChange("expiryDate", value)}
              placeholder="dd/mm/aaaa"
              value={form.expiryDate}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View>
          <Text style={styles.textAboveInput}>Codigo de barras </Text>

          <View style={styles.inputPhotoWrapper}>
            <InputPhoto
              imageUri={barcodeImageUri}
              onClear={() => setBarcodeImageUri(null)}
              onImageSelected={handleBarcodeImagePicked}
            />
          </View>
          {barcodeImageUri && (
            <Text style={styles.textImage}>Imagem adicionada com sucesso!</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleSave}>
          <Text>Salvar</Text>
        </Button>
        <Button onPress={handleCancel}>
          <Text>Cancelar</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

export default ProductsRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 8,
    fontWeight: "bold", // Negrito para destacar o texto
  },
  containerMenor: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: 20, // Espaçamento entre esta seção e outros componentes
    padding: 10, // Espaçamento interno do container
    borderRadius: 12, // Bordas arredondadas, se necessário
  },
  inputPhotoWrapper: {
    flexDirection: "row", // Alinha os componentes lado a lado
    justifyContent: "space-between", // Distribui os itens com espaço uniforme
    alignItems: "center", // Centraliza verticalmente os itens
    gap: 10, // Espaçamento entre os componentes (React Native >= 0.71)
  },
  textImage: {
    marginTop: 10, // Espaço entre a mensagem e o InputPhoto
    fontSize: 14, // Tamanho menor para mensagens
    color: "green", // Cor do texto de sucesso
    textAlign: "center", // Centraliza horizontalmente o texto
    fontFamily: "lato",
    fontWeight: "bold", // Negrito para destacar a mensagem
  },
  backButton: {
    paddingVertical: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 20,
  },
});
