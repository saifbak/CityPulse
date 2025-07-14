import React, { FC } from 'react';
import { View, Button, Text, TouchableOpacity, Image, Alert, I18nManager } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';
import useAuth from '../../core/hooks/useAuth';
import { AuthStackParamList } from '../../core/types/navigation.types';
import { LoginSchema } from '../../core/schema/login.schema';
import FormTextInput from '../../components/FormTextInput';
import { Icons } from '../../assets';
import { useLocalizationContext } from '../../core/context/LocalizationContext';

const LoginScreen: FC = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const { signIn, biometricLogin } = useAuth();
    const { translate, language } = useLocalizationContext();
    
    const handleBio = async () => {
        const response = await biometricLogin();
        if (!response) Alert.alert(translate('login.biometric'));
    };

    const isRtl = language === 'ar' ? true : false;

    return (
        <View style={styles.container}>
            <Image source={Icons.logo} style={styles.logo} />
            <Text style={styles.header}>{translate('common.welcome')}</Text>
            <Formik
                initialValues={{ email: '', password: '', general: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                    try {
                        await signIn(values.email, values.password);
                    } catch (e: any) {
                        setFieldError('general', e?.message ?? 'Login failed');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleSubmit, isSubmitting }) => (
                    <>
                        {errors.general && <Text style={styles.error}>{errors.general}</Text>}
                        <FormTextInput
                            isRtl={isRtl}
                            name="email"
                            label={translate('login.email')}
                            placeholder={translate('login.email')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <FormTextInput
                            isRtl={isRtl}
                            name="password"
                            label={translate('login.password')}
                            placeholder={translate('login.email')}
                            secure
                        />
                        <Button title={translate('login.login')} onPress={handleSubmit as any} disabled={isSubmitting} />
                    </>
                )}
            </Formik>
            <TouchableOpacity style={[styles.bioBtn, { flexDirection: isRtl ? 'row-reverse' : 'row' }]} onPress={handleBio}>
                <Image source={Icons.fingerprint} style={styles.bioIcon} />
                <Text style={styles.bioText}>{translate('login.biometric')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkWrapper} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>{translate('login.noAccount')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: '20@s',
        justifyContent: 'center'
    },
    logo: {
        width: '150@s',
        height: '150@s',
        marginBottom: '20@vs',
        alignSelf: 'center'
    },
    header: {
        fontSize: '28@ms',
        fontWeight: 'bold',
        marginBottom: '20@vs',
        textAlign: 'center'
    },
    linkWrapper: {
        marginTop: '16@vs'
    },
    link: {
        color: '#007bff',
        textAlign: 'center',
        fontSize: '14@ms'
    },
    error: {

        color: 'red',
        marginBottom: '6@vs',
        fontSize: '12@ms'
    },
    bioBtn: {
        flexDirection: I18nManager.isRTL === true ? 'row-reverse' : 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '20@vs',
    },
    bioIcon: {
        width: '26@vs',
        height: '26@vs',
        tintColor: '#FF6B00',
        marginRight: '6@s'

    },
    bioText: {
        fontSize: '14@ms',
        color: '#FF6B00',
        fontWeight: '600'

    },
});

export default LoginScreen;
