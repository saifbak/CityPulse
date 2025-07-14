import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeStackParamList } from '../core/types/navigation.types';
import EventDetails from '../screens/EventDetails';
import ProfileScreen from '../screens/Profile';
import EventsListScreen from '../screens/Home';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={EventsListScreen} />
            <Stack.Screen name="EventDetail" component={EventDetails} />
            <Stack.Screen name="EventProfile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}
