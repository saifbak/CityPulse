import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useField } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';
import { Icons } from '../assets';          // 👈 add an eye & eye-off icon here

interface Props extends TextInputProps {
  name: string;
  label?: string;
  secure?: boolean;
  isRtl?: boolean;
}

const FormTextInput: React.FC<Props> = ({
  name,
  label,
  secure,
  style,
  isRtl = false,
  ...rest
}) => {
  const [field, meta, helpers] = useField<string>(name);
  const [hide, setHide] = useState(secure);           // 👈 local state

  const inputStyle: StyleProp<TextStyle> = [
    styles.input,
    isRtl && styles.inputRtl,
    style,
  ];

  return (
    <View style={[styles.wrapper, isRtl && styles.wrapperRtl]}>
      {label && (
        <Text style={[styles.label, isRtl && styles.labelRtl]}>{label}</Text>
      )}

      <View style={styles.row}>
        <TextInput
          style={[inputStyle, secure && styles.inputWithIcon]}
          value={field.value}
          secureTextEntry={secure ? hide : false}
          onChangeText={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          {...rest}
        />

        {secure && (
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setHide((prev) => !prev)}
          >
            <Image
              source={hide ? Icons.eyeClosed : Icons.eyeOpen}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {meta.touched && meta.error && (
        <Text style={[styles.error, isRtl && styles.labelRtl]}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: { marginBottom: '12@vs', alignItems: 'flex-start' },
  wrapperRtl: { alignItems: 'flex-end' },

  label: { marginBottom: '4@vs', fontSize: '14@ms', fontWeight: '500' },
  labelRtl: { alignSelf: 'flex-end' },

  row: { width: '100%', position: 'relative' },

  input: {
    height: '44@vs',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '5@ms',
    paddingStart: '10@s',
    paddingEnd: '40@s',        
    fontSize: '14@ms',
    alignSelf: 'stretch',
  },
  inputWithIcon: { paddingEnd: '40@s' },
  inputRtl: { textAlign: 'right', writingDirection: 'rtl' },

  eyeBtn: {
    position: 'absolute',
    right: '10@s',
    top: '10@vs',
    width: '24@s',
    height: '24@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: { width: '20@s', height: '20@s', tintColor: '#666' },

  error: { color: 'red', marginTop: '4@vs', fontSize: '12@ms' },
});

export default FormTextInput;
