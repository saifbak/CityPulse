import React, { createContext, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface Ctx {
    user: FirebaseAuthTypes.User | null;
    initialising: boolean;
    setUser: (u: FirebaseAuthTypes.User | null) => void;
}

const UserContext = createContext<Ctx | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [initialising, setInitialising] = useState(true);

    useEffect(() => {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000)); 

        const authCheck = new Promise<void>((resolve) => {
            const sub = auth().onAuthStateChanged((fbUser) => {
                setUser(fbUser);
                resolve();
            });
            return () => sub();
        });

        Promise.all([delay, authCheck]).then(() => {
            setInitialising(false);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, initialising, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUserContext must be inside UserProvider');
    return ctx;
};
