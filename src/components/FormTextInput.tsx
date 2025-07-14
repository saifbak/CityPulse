import React from 'react';
import {
    TextInput,
    Text,
    View,
    TextInputProps,
    StyleProp,
    TextStyle,
} from 'react-native';
import { useField } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';

interface Props extends TextInputProps {
    name: string;
    label?: string;
    secure?: boolean;
    isRtl?: boolean;           // pass true when Arabic
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

            <TextInput
                style={inputStyle}
                value={field.value}
                secureTextEntry={secure}
                onChangeText={helpers.setValue}
                onBlur={() => helpers.setTouched(true)}
                {...rest}
            />

            {meta.touched && meta.error && (
                <Text style={[styles.error, isRtl && styles.labelRtl]}>{meta.error}</Text>
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    wrapper: {
        marginBottom: '12@vs',
        alignItems: 'flex-start',
    },
    wrapperRtl: {
        alignItems: 'flex-end',
    },
    label: {
        marginBottom: '4@vs',
        fontSize: '14@ms',
        fontWeight: '500',
        textAlign: 'right',
    },
    labelRtl: {
        alignSelf:'flex-end',
    },
    input: {
        height: '44@vs',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: '5@ms',
        paddingStart: '10@s',
        paddingEnd: '10@s',
        fontSize: '14@ms',
        textAlign: 'left',
        alignSelf: 'stretch',
    },
    inputRtl: {
        textAlign: 'right',
        writingDirection: 'rtl',
    },

    error: {
        color: 'red',
        marginTop: '4@vs',
        fontSize: '12@ms',
        textAlign: 'left',
    },
});


export default FormTextInput;
