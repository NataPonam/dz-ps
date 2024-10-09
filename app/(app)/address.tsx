import GeoTag from '@/assets/icons/inputAddressIcon/GeoTag';
import Compass from '@/assets/icons/inputAddressIcon/Compass';
import { Colors, Fonts } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { ButtonComponent } from '@/shared/ButtonComponent/ButtonComponent';
import InputMultiIcon from '@/assets/icons/inputAddressIcon/InputMultiIcon';
import * as Location from 'expo-location';
import { useAtom } from 'jotai';
import { getAddress, getAddressInfo } from '@/entities/address/address.state';
import { router } from 'expo-router';
import ErrorNotification from '@/shared/ErrorNotification/ErrorNotification';

export default function Address() {
  const [savedAddressAtom, setSavedAddressAtom] = useAtom(getAddress);
  const [savedInfoAtom, setSavedInfoAtom] = useAtom(getAddressInfo);

  const [addressInput, setAddressInput] = useState<string>('');
  const [multilineText, setMultilineText] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [errorPermission, setErrorPermission] = useState<string | null>(null);
  const [errorDevice, setErrorDevice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentAddress, setCurrentAddress] = useState<Location.LocationGeocodedAddress[][0]>();

  useEffect(() => {
    if (savedAddressAtom) {
      setAddressInput(savedAddressAtom);
      setMultilineText(savedInfoAtom);
    } else {
      setAddressInput(addressInput);
      setMultilineText(multilineText);
    }
  }, [savedAddressAtom]);

  useEffect(() => {
    if (currentAddress) {
      const geoLocationAddress = `${currentAddress?.city}, ${currentAddress?.street} ${currentAddress?.streetNumber ? currentAddress?.streetNumber : ''}`;
      setAddressInput(geoLocationAddress);
    }
  }, [currentAddress]);

  const getGeoPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorPermission('Недостаточно прав для доступа к геолокации');
      return;
    }
  };
  const getGeoLocation = async () => {
    if (errorPermission) {
      setErrorMessage(errorPermission);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } else {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        if (coords) {
          const { latitude, longitude } = coords;
          setLatitude(latitude);
          setLongitude(longitude);
        }
      } catch (error) {
        if (error) {
          setErrorDevice('Не можем Вас найти, пожалуйста введите адрес вручную');
        }
      }
      if (errorDevice) {
        setErrorMessage(errorDevice);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      } else {
        const addressReversed = await Location.reverseGeocodeAsync({ latitude, longitude });
        setCurrentAddress(addressReversed[0]);
      }
    }
  };

  useEffect(() => {
    getGeoPermission();
  }, []);

  const saveAddress = () => {
    setSavedAddressAtom(addressInput);
    setSavedInfoAtom(multilineText);
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.inputSingleWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Введите адрес"
            placeholderTextColor={Colors.placeholder}
            onChangeText={setAddressInput}
            value={addressInput}
            multiline={true}
          />
        </View>
        <View style={styles.icon}>
          <GeoTag />
        </View>
        <Pressable onPress={getGeoLocation} style={styles.compassButton}>
          <Compass />
        </Pressable>
      </View>
      <View>
        <View style={styles.inputMultyWrapper}>
          <TextInput
            style={styles.inputMulty}
            placeholder="Введите текст"
            placeholderTextColor={Colors.placeholder}
            onChangeText={setMultilineText}
            value={multilineText}
            multiline={true}
          />
        </View>
        <View style={styles.icon}>
          <InputMultiIcon />
        </View>
      </View>
      <ErrorNotification error={errorMessage} />
      <ButtonComponent text="Сохранить" onPress={saveAddress} style={styles.button} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
    gap: 16,
  },

  compassButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.accentBrown,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 11,
    right: 9,
  },
  inputSingleWrapper: {
    fontFamily: Fonts.regular,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    width: '100%',
    height: 56,
    padding: 16,
    paddingLeft: 40,
  },
  input: {
    fontSize: 14,

    color: Colors.darkText,
  },
  inputMultyWrapper: {
    width: '100%',
    height: 56,
    padding: 16,
    paddingLeft: 40,
    fontSize: 14,
    fontFamily: Fonts.regular,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: Colors.darkText,
    minHeight: 139,
  },
  inputMulty: {
    textAlign: 'left',
    textAlignVertical: 'top',
    lineHeight: 17,
  },
  icon: {
    position: 'absolute',
    top: 19,
    left: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 70,
    backgroundColor: Colors.accentBrown,
    height: 62,
    borderRadius: 16,
  },
});
