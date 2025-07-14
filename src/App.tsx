import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager } from 'react-native';

import RootNavigator from './navigation/RootNavigator';
import { UserProvider } from './core/context/UserContext';
import { LocalizationProvider } from './core/context/LocalizationContext';
import './core/i18n';

I18nManager.allowRTL(true);

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider>
          <UserProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <PaperProvider>
                  <RootNavigator />
                </PaperProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </UserProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
