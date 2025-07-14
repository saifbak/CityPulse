import React from 'react';
import { TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface Props extends TextInputProps {
  placeholder?: string;
  onChangeText: (t: string) => void;
  style?: StyleProp<TextStyle>;
}

export default function SearchBar({ placeholder, onChangeText, style, ...rest }: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
      {...rest}
    />
  );
}

const styles = ScaledSheet.create({
  input: {
    margin: '10@s',
    padding: '10@s',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '8@ms',
    fontSize: '14@ms',
  },
});
