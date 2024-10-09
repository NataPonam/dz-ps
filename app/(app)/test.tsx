import { Colors, Fonts } from '@/constants/Colors';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function NotificationInformation() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Курьер уже в пути!</Text>
      <Image source={require('../../assets/images/coffee.png')} style={styles.img} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontStyle: 'normal',
    alignSelf: 'center',
    color: Colors.accentBrown,
    fontFamily: Fonts.semibold,
  },
  img: {
    height: 150,
    width: 150,
  },
});
