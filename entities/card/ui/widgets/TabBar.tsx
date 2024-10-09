import { selectedCoffeListAtom } from '@/app/(app)/[alias]';
import BagTabIcon from '@/assets/icons/tabsIcon/BagTabIcon';
import HomeTabIcon from '@/assets/icons/tabsIcon/HomeTabIcon';
import Underline from '@/assets/icons/tabsIcon/Underline';
import { Colors, Fonts } from '@/constants/Colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { useAtomValue } from 'jotai';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const selectedCoffeeList = useAtomValue(selectedCoffeListAtom);
  const countItems = selectedCoffeeList.reduce((acc, item) => acc + item.quantity, 0);
  const badge = countItems ? countItems : undefined;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused ? Colors.accentBrown : Colors.grayIcon;
        let borderRightWidth;
        if (route.name === 'catalog') {
          borderRightWidth = 2;
        } else {
          borderRightWidth = 0;
        }
        return (
          <Pressable
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ ...styles.item, borderRightWidth: borderRightWidth }}
          >
            <View style={styles.wrapper}>
              <View style={styles.iconWrapper}>
                {route.name === 'catalog' ? (
                  <HomeTabIcon color={color} />
                ) : (
                  <View>
                    {badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{countItems}</Text>
                      </View>
                    )}
                    <BagTabIcon color={color} />
                  </View>
                )}
                {isFocused ? (
                  <View style={styles.iconUnderline}>
                    <Underline />
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <Text style={styles.text}>{label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowRadius: 24,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    elevation: 24,
  },
  item: {
    height: 46,
    padding: 10,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRightColor: Colors.borderColor,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconUnderline: {
    position: 'absolute',
    bottom: -6,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  text: {
    color: Colors.lightText,
    fontSize: 14,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -5,
    height: 15,
    width: 15,
    backgroundColor: Colors.accentBrownClear,
    borderRadius: 10,
    borderColor: Colors.accentBrown,

    borderWidth: 1,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: Colors.accentBrown,
    fontFamily: Fonts.semibold,
    lineHeight: 12,
  },
});
