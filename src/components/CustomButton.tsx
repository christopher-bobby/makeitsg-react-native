import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
