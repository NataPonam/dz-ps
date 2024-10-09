import React from 'react';
import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/entities/card/ui/widgets/TabBar';

export default function CatalogLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="catalog"
        options={{
          title: 'Главная',
          tabBarLabel: 'Главная',
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Заказ',
          tabBarLabel: 'Заказ',
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
