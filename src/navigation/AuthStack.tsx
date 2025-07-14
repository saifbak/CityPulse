import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from '../core/types/navigation.types';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
    );
}
