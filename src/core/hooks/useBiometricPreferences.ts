import { useEffect, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import { StorageService } from "../services/storage";


const STORAGE_KEYS = {
    BIOMETRIC_ENABLED: 'bio_enabled',
};

const useBioMetricPreferences = () => {
    const [enabled, setEnabled] = useState(false);
    const [isBioMetricEnable, seIsBioMetricEnable] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const val = await StorageService.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
            seIsBioMetricEnable(val === 'true');
            setEnabled(val === 'true')
            setLoading(false);
        })();
    }, []);

    const toggleBiometric = async (val: boolean) => {
        setEnabled(val);
        await StorageService.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, val ? 'true' : 'false');
    };

    const enableBiometricAuth = async () => {
        const rnBiometrics = new ReactNativeBiometrics();
        await rnBiometrics.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject;

                if (available && biometryType === BiometryTypes.TouchID) {
                    Alert.alert('TouchID', 'Would you like to enable TouchID authentication for the next time?', [
                        {
                            text: 'Yes please',
                            onPress: async () => {

                                Alert.alert('Success!', 'TouchID authentication enabled successfully!');
                            },
                        },
                        { text: 'Cancel', style: 'cancel' },
                    ]);
                } else if (available && biometryType === BiometryTypes.FaceID) {
                    Alert.alert('FaceID', 'Would you like to enable FaceID authentication for the next time?', [
                        {
                            text: 'Yes please',
                            onPress: async () => {

                                Alert.alert('Success!', 'FaceID authentication enabled successfully!');
                            },
                        },
                        { text: 'Cancel', style: 'cancel' },
                    ]);
                } else if (available && biometryType === BiometryTypes.Biometrics) {
                    Alert.alert('Device Supported Biometrics', 'Biometrics authentication is supported.');
                } else {
                    Alert.alert('Biometrics not supported', 'This device does not support biometric authentication.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                Alert.alert('Error', 'An error occurred while checking biometrics availability.');
            });
    };



    return {
        enableBiometricAuth,
        enabled,
        toggleBiometric,
        loading,
        isBioMetricEnable,
    }
}

export default useBioMetricPreferences