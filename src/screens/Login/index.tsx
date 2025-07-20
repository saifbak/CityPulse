import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, I18nManager, Switch } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';
import useAuth from '../../core/hooks/useAuth';
import { AuthStackParamList } from '../../core/types/navigation.types';
import { LoginSchema } from '../../core/schema/loginValidation.schema';
import FormTextInput from '../../components/FormTextInput';
import { Icons } from '../../assets';
import { useLocalizationContext } from '../../core/context/LocalizationContext';
import useBioMetricPreferences from '../../core/hooks/useBiometricPreferences';
import { isBiometricAvailable, promptBiometric } from '../../core/services/biometrics';
import GlobalButton from '../../components/Button';
import { StorageService } from '../../core/services/storage';

const LoginScreen: FC = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const [biometricSupported, setBiometricSupported] = useState<boolean | null>(null);

    const { enabled: bioEnabled, toggleBiometric: setBioEnabled, isBioMetricEnable } = useBioMetricPreferences()
    const { signIn, isLoading, biometricLogin, getSavedCredentials, saveCredentials } = useAuth();
    const { translate, language } = useLocalizationContext();


    useEffect(() => {
        (async () => {
            const available = await isBiometricAvailable();
            setBiometricSupported(available);
        })()
    }, [])

    const handleEnableBio = async (next: boolean) => {
        if (!next) {
            await setBioEnabled(false);
            await StorageService.removeItem('bio_enabled')
            return;
        }
        const available = await isBiometricAvailable();
        if (!available) {
            Alert.alert(translate('login.biometricNotAvailable'));
            return;
        }
        const success = await promptBiometric();
        if (!success) return;
        await setBioEnabled(true);

    };

    const isRtl = language === 'ar' || false;

    return (
        <View style={styles.container}>
            <Image source={Icons.logo} style={styles.logo} />
            <Text style={styles.header}>{translate('common.welcome')}</Text>
            <Formik
                initialValues={{ email: '', password: '', general: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                    try {
                        if (bioEnabled) {
                            const creds = await getSavedCredentials();
                            if (!creds) {
                                await saveCredentials(values.email, values.password)
                            }
                        }
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
                            style={{ textAlign: isRtl ? 'right' : 'left' }}
                        />
                        <FormTextInput
                            isRtl={isRtl}
                            name="password"
                            label={translate('login.password')}
                            placeholder={translate('login.password')}
                            secure
                            style={{ textAlign: isRtl ? 'right' : 'left' }}
                        />
                        <GlobalButton title={translate('login.login')} onPressed={handleSubmit as any} disabled={isSubmitting} loading={isLoading} />
                    </>
                )}
            </Formik>

            {biometricSupported && !isBioMetricEnable && (
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>{translate('login.enableBiometric')}</Text>
                    <Switch value={bioEnabled} onValueChange={handleEnableBio} />
                </View>
            )}
            {isBioMetricEnable &&
                <TouchableOpacity style={[styles.bioBtn, { flexDirection: isRtl ? 'row-reverse' : 'row' }]} onPress={biometricLogin}>
                    <Image source={Icons.fingerprint} style={styles.bioIcon} />
                    <Text style={styles.bioText}>{translate('login.biometric')}</Text>
                </TouchableOpacity>}
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6B00',
        color: 'white',
        width: '100%',
        height: '45@vs',
        borderRadius: '8@s'
    },
    buttonTitle: {
        color: '#ffffff',
        fontSize: '12@vs',
        fontWeight: '700'
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
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '16@vs'

    },
    switchLabel: {
        fontSize: '14@ms',
        fontWeight: '500'

    },
});

export default LoginScreen;
