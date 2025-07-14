import React from 'react';
import { View, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Splash';
import MainTabs from './MainTab';
import AuthStack from './AuthStack';
import { useUserContext } from '../core/context/UserContext';

export type RootStackParamList = {
    Splash: undefined;
    App: undefined; 
    Auth: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    const { user, initialising } = useUserContext();

    if (initialising) {
        return (
            <View style={{ flex: 1 }}>
                <SplashScreen />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="App" component={MainTabs} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
