import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

type ImagePickerInputProps = {
  onImageSelected: (uri: string) => void;
  onClear: () => void;
  imageUri?: string | null;
};

const InputPhoto = ({ onImageSelected }: ImagePickerInputProps) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.placeholder} onPress={pickImage}>
          <Text style={styles.textButton}>Selecionar Imagem</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputPhoto;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  container: {
    backgroundColor: "#C9C9C9",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: "80%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "black",
  },
  textButton: {
    color: "black",
    fontSize: 14,
  },
});
