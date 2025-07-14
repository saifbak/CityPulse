import ReactNativeBiometrics from 'react-native-biometrics';

export async function isBiometricAvailable(): Promise<boolean> {
  const rnBiometrics = new ReactNativeBiometrics();
  const { available } = await rnBiometrics.isSensorAvailable();
  return available;
}

export async function promptBiometric(): Promise<boolean> {
  const rnBiometrics = new ReactNativeBiometrics();
  const { success } = await rnBiometrics.simplePrompt({
    promptMessage: 'Login with biometrics',
    cancelButtonText: 'Cancel',
  });
  return success;
}
