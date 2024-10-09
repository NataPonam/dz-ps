/* eslint-disable react-native/no-inline-styles */
import { Colors, Fonts } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';

export interface ErrorType {
  error?: string | null;
}

export default function ErrorNotification({ error }: ErrorType) {
  const [isShown, setIsShown] = useState<boolean>(false);
  const animatedValue = new Animated.Value(-100);
  const onEnter = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!error) {
      setIsShown(false);
      return;
    }
    setIsShown(true);
    const timerId = setTimeout(() => {
      setIsShown(false);
    }, 4000);
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  if (!isShown) {
    return <></>;
  }

  return (
    <Animated.View
      style={{ ...styles.errorMessage, transform: [{ translateY: animatedValue }] }}
      onLayout={onEnter}
    >
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accentBrown,
    position: 'absolute',
    minHeight: 40,
    width: Dimensions.get('screen').width,
    paddingVertical: 30,
  },
  errorText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    borderRadius: 14,
  },
});
