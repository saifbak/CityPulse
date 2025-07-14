import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSavedCredentials, saveCredentials } from '../services/credentials ';
import { isBiometricAvailable, promptBiometric } from '../services/biometrics';
import { useUserContext } from '../context/UserContext';

const EMAIL_KEY = 'email';

const useAuth = () => {
    const { user, setUser, initialising } = useUserContext();

    const signIn = async (email: string, password: string) => {
        const res = await auth().signInWithEmailAndPassword(email, password);
        setUser(res.user);
        await AsyncStorage.setItem(EMAIL_KEY, email);
        await saveCredentials(email, password);
    };

    const signUp = async (email: string, password: string) => {
        const res = await auth().createUserWithEmailAndPassword(email, password);
        setUser(res.user);
        await AsyncStorage.setItem(EMAIL_KEY, email);
        await saveCredentials(email, password);
    };

    const signOut = async () => {
        await auth().signOut();
        setUser(null);
        await AsyncStorage.removeItem(EMAIL_KEY);
    };

    const biometricLogin = async (): Promise<boolean> => {
        if (!(await isBiometricAvailable())) return false;

        const creds = await getSavedCredentials();
        if (!creds) return false;

        const response = await promptBiometric();
        if (!response) return false;

        try {
            const res = await auth().signInWithEmailAndPassword(creds.email, creds.password);
            setUser(res.user);
            return true;
        } catch {
            return false;
        }
    };

    return { user, initialising, signIn, signUp, signOut, biometricLogin };
};

export default useAuth;