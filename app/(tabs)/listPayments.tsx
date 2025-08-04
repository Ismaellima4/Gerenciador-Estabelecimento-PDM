
import { Search } from "@/components/Search";
import { fetchPayments } from "@/store/paymentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { listStyles } from "@/styles/listStyles";
import { PaymentTypeTranslations } from "@/types/enum/payment-type.enum";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";



export default function ListPayments() {

  const dispatch = useDispatch<AppDispatch>();

  const payments = useSelector((state: RootState) => state.payment.list);

  useEffect(() => {
      dispatch(fetchPayments());
    }, [dispatch]);

    return (
      <SafeAreaView style={listStyles.container}>
        <View style={listStyles.header}>
          <Text style={listStyles.title}>Pagamentos</Text>
        </View>
        
        <Search items={payments} searchBy="id" getDetailsPath={() => 'payments/paymentDetails'}/>

          <FlatList
            data={payments}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <Link href={{
                pathname: 'payments/paymentDetails',
                params: {
                  id: item.id,
                }
                }} asChild>

                    <TouchableOpacity>
                      <View style={listStyles.card}>
                        <Text style={listStyles.cardTitle}>{item.id}</Text>
                        <Text style={listStyles.cardInfo}>Valor: {item.amount}</Text>
                        <Text style={listStyles.cardInfo}>Data: {item.date.toString()}</Text>
                        <Text style={listStyles.cardInfo}>Forma de Pagamento: { PaymentTypeTranslations[item.paymentType]}</Text>
                        
                      </View>
                    </TouchableOpacity>
              </Link>

                 )}
                 ListEmptyComponent={<Text style={listStyles.emptyText}>Nenhum Pagamento relizado.</Text>}
               />
     </SafeAreaView>
  );
}


