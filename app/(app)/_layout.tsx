import React, { useEffect } from 'react';
import { Colors, Fonts } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NotificationsComponent } from '@/shared/Notification/Notification';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Sora-Regular': require('../../assets/fonts/Sora-Regular.ttf'),
    'Sora-SemiBold': require('../../assets/fonts/Sora-SemiBold.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NotificationsComponent />
      <StatusBar style="light" backgroundColor="black" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            statusBarColor: Colors.black,
            navigationBarColor: Colors.black,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            navigationBarColor: Colors.white,
          }}
        />
        <Stack.Screen
          name="[alias]"
          options={{
            statusBarColor: Colors.white,
            statusBarStyle: 'dark',
            headerShown: true,
            title: 'Описание',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="address"
          options={{
            statusBarColor: Colors.white,
            statusBarStyle: 'dark',
            headerShown: true,
            title: 'Изменить адрес',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: Fonts.semibold,
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="test"
          options={{
            statusBarColor: Colors.white,
            statusBarStyle: 'dark',
            headerShown: true,
            title: 'Доставка',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: Fonts.semibold,
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
