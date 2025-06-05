import { Tabs } from "expo-router";
import React from "react";
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

export default function TabLayout() {
  return ( 
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
        }} 
      />

       <Tabs.Screen 
        name="listproducts" 
        options={{ 
          title: "produtos",
          tabBarIcon: () => <MaterialCommunityIcons name="basket" size={24} color="black" />
        }} 
      />

      <Tabs.Screen 
        name="listSuppliers" 
        options={{ 
          title: "fornecedores",
          tabBarIcon: () => <FontAwesome name="handshake-o" size={24} color="black" />
        }} 
      />
      <Tabs.Screen 
        name="productDetails"
        options={{
          tabBarIcon: () => null,
        }}
      
      />

    </Tabs>
  );
}