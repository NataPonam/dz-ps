import React from 'react';
import { Colors, Fonts } from '@/constants/Colors';
import { Pressable, Text, StyleSheet } from 'react-native';
import EditIcon from '@/assets/icons/EditIcon';
import { router } from 'expo-router';
import { getAddress } from '@/entities/address/address.state';
import { useAtom } from 'jotai';

export default function AddressLine() {
  const [addressLocation] = useAtom(getAddress);

  return (
    <>
      <Text style={styles.text}>Адрес</Text>
      <Pressable style={styles.container} onPress={() => router.push('/(app)/address')}>
        <Text style={styles.textAddress}>
          {addressLocation ? addressLocation : 'Добавьте адрес'}
        </Text>
        <EditIcon color={Colors.grayIcon} />
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 1,
    color: Colors.textGray,
    fontFamily: Fonts.regular,
    marginBottom: 4,
    lineHeight: 12,
  },
  textAddress: {
    fontSize: 14,
    fontStyle: 'normal',
    color: Colors.textGray,
    fontFamily: Fonts.semibold,
    lineHeight: 18,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 4,
    alignItems: 'center',
  },
});
