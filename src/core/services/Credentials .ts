import * as Keychain from 'react-native-keychain';

export const saveCredentials = async (email: string, password: string) => {
  await Keychain.setGenericPassword(email, password, { service: 'bio_key' });
};

export const getSavedCredentials = async (): Promise<{ email: string; password: string } | null> => {
  const creds = await Keychain.getGenericPassword({ service: 'bio_key' });
  return creds ? { email: creds.username, password: creds.password } : null;
};

export const removeCredentials = async () => {
  await Keychain.resetGenericPassword({ service: 'bio_key' });
};