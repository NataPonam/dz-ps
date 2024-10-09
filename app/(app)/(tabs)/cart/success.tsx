import React from 'react';
import { Colors, Fonts } from '@/constants/Colors';
import { ButtonComponent } from '@/shared/ButtonComponent/ButtonComponent';
import { router } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import { atom, useSetAtom } from 'jotai';

export const activeModalAtom = atom<boolean>(false);

export default function Success() {
  const setActiveModal = useSetAtom(activeModalAtom);

  const navigateToCatalog = () => {
    setTimeout(() => {
      setActiveModal(true);
    }, 2000);

    router.navigate('/(app)/(tabs)/catalog');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Заказ оформлен!</Text>
      <Image style={styles.image} source={require('./../../../../assets/images/coffee.png')} />
      <ButtonComponent text="На главную" onPress={navigateToCatalog} style={styles.button} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 37,
  },
  text: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    color: Colors.darkText,
  },
  image: {
    height: 214,
    width: 214,
  },

  button: {
    width: '100%',
    marginBottom: 70,
  },
});
