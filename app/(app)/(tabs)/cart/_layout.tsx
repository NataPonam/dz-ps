import React from 'react';
import { Colors, Fonts } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CartLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="white" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            statusBarColor: Colors.white,
            statusBarStyle: 'dark',
            headerShown: true,
            title: 'Заказ',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: Fonts.semibold,
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="success"
          options={{
            statusBarColor: Colors.white,
            statusBarStyle: 'dark',
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
