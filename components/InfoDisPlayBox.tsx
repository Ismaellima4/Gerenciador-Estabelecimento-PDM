import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface InfoDisPlayBoxProps {
  text: string;
}

const InfoDisplayBox: React.FC<InfoDisPlayBoxProps> = ({ text }: InfoDisPlayBoxProps) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    width: '85%',
    backgroundColor: '#e0e0e0', // A bit darker than background for contrast
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default InfoDisplayBox;