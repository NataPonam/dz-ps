import React from 'react';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { Colors, Fonts } from '@/constants/Colors';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { getAddress, getAddressInfo } from '../address/address.state';
import EditIcon from '@/assets/icons/EditIcon';

export default function OrderDeliveryAddress() {
  const [addressLocation] = useAtom(getAddress);
  const [addressInfo] = useAtom(getAddressInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Адрес доставки</Text>
      <View>
        {addressLocation && <Text style={styles.address}>{addressLocation}</Text>}
        {addressInfo && <Text style={styles.info}>{addressInfo}</Text>}
      </View>
      <Pressable onPress={() => router.push('/(app)/address')} style={styles.button}>
        <EditIcon color={Colors.darkText} />
        <Text>Редактировать адрес</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 15,
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    lineHeight: 16,
    color: Colors.darkText,
  },
  address: {
    fontFamily: Fonts.semibold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.darkText,
    marginBottom: 8,
  },
  info: {
    fontFamily: Fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: Colors.lightText,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 190,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 12,
    color: Colors.darkText,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
