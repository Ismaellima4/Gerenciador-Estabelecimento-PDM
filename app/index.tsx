import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";



export default function Index() {
  return (

    <View>
      <TouchableOpacity>
        <Link href="/supplierRegistration" push>Registrar Produto</Link>
      </TouchableOpacity>
    </View>
  );
}