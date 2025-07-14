import * as Keychain from 'react-native-keychain';

export const saveCredentials = async (email: string, password: string) => {
  await Keychain.setGenericPassword(email, password);
};

export const getSavedCredentials = async (): Promise<{ email: string; password: string } | null> => {
  const creds = await Keychain.getGenericPassword();
  return creds ? { email: creds.username, password: creds.password } : null;
};