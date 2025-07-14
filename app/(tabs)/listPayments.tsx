
import { Search } from "@/components/Search";
import { RootState } from "@/store/store";
import { listStyles } from "@/styles/listStyles";
import { Link } from "expo-router";
import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";



export default function ListPayments() {

  const payments = useSelector((state: RootState) => state.payment.list);


    return (
      <SafeAreaView style={listStyles.container}>
        <View style={listStyles.header}>
          <Text style={listStyles.title}>Pagamentos</Text>
        </View>
        
        <Search />

          <FlatList
            data={payments}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <Link href={{
                pathname: '/paymentDetails',
                params: {
                  id: item.id,
                }
                }} asChild>

                    <TouchableOpacity>
                      <View style={listStyles.card}>
                        <Text style={listStyles.cardTitle}>{item.id}</Text>
                        <Text style={listStyles.cardInfo}>Valor: {item.amount}</Text>
                        <Text style={listStyles.cardInfo}>Data: {item.date.toString()}</Text>
                        <Text style={listStyles.cardInfo}>Forma de Pagamento: {item.paymentType}</Text>
                        
                      </View>
                    </TouchableOpacity>
              </Link>

                 )}
                 ListEmptyComponent={<Text style={listStyles.emptyText}>Nenhum Pagamento relizado.</Text>}
               />
     </SafeAreaView>
  );
}


