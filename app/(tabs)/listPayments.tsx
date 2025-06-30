
import { Search } from "@/components/Search";
import { listStyles } from "@/styles/listStyles";
import { View, Text, StyleSheet } from "react-native";



export default function ListPayments() {
     return (
        <View style={listStyles.container}>
          <View style={listStyles.header}>
            <Text style={listStyles.title}>Pagamentos</Text>
          </View>
        
          <Search />
          <Text style={styles.emptyText}>Nenhum pagamento realizado.</Text>
        
        </View>
      );
}

const styles = StyleSheet.create({
   emptyText: { 
    textAlign: 'center',
    marginTop: 20, 
    color: '#999' 
  },
});

