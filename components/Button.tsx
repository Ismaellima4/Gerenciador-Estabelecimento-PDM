// Button.tsx (React Native version)
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.textButton}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
