// ButtonSave.tsx (React Native version)
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function ButtonSave({ onPress, children }: { onPress: () => void, children: React.ReactNode }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'slategray', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>{children}</Text>
        </TouchableOpacity>
    );
}

export default ButtonSave;
