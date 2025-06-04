import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

type ImagePickerInputProps = {
  onImageSelected: (uri: string) => void;
};

const InputPhoto = ({ onImageSelected }: ImagePickerInputProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }),
      (response: any) => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets?.[0].uri;
          if (uri) {
            setImageUri(uri);
            onImageSelected(uri);
          }
        }
      };
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <TouchableOpacity
            style={styles.buttonPlaceholder}
            onPress={pickImage}
          >
            <Text style={styles.textButton}>Selecionar Imagem</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
  },
  container: {
    alignItems: "center",
  },
  placeholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#C9C9C9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    backgroundColor: "skyblue",
    borderRadius: 20,
    borderStyle: "dashed",
    borderColor: "black",
    borderWidth: 1,
  },
  textButton: {
    color: "white",
    fontSize: 24,
    fontFamily: "lato",
    textAlign: "center",
  },
});
