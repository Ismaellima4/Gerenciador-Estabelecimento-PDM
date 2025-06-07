import React from "react";
import { StyleSheet, TextInput } from "react-native";

function Input({
  onChangeText,
  placeholder,
  ...props
}: {
  onChangeText: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      style={styles.input}
      {...props}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#C9C9C9C9",
    borderColor: "black",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default Input;
