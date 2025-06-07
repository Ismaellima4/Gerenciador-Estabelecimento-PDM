import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return ( 
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen 
        name="homeScreen" 
        options={{ 
          title: "home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
        }} 
      />
     
      <Tabs.Screen 
        name="listSuppliers" 
        options={{ 
          title: "fornecedores",
          tabBarIcon: () => <FontAwesome name="handshake-o" size={24} color="black" />
        }} 
      />

    </Tabs>
  );
}