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
      <TouchableOpacity >
          <Link href="/listproducts" push><Text>Produtos</Text></Link>
      </TouchableOpacity>
    </View>
  );
}
