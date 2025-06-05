import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/ProductsRegisterScreen" asChild>
        <TouchableOpacity><Text>Edit app/index.tsx to edit this screen</Text></TouchableOpacity>
      </Link>
    </View>
  );
}
