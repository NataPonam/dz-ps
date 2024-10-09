import React from 'react';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CatalogLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="black" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            statusBarColor: Colors.black,
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
