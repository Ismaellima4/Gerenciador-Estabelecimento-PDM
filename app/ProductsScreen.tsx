// ProductsScreen.tsx (React Native version)
import ButtonSave from '@/components/ButtonSave';
import React from 'react';
import { Text, View } from 'react-native';

function ProductsScreen() {
    const handleSave = () => {
        console.log('Save button pressed');
        // Add your save logic here
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ButtonSave onPress={handleSave}>
                <Text>Salvar</Text>
            </ButtonSave>
        </View>
    );
}

export default ProductsScreen;
