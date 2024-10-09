import { Colors, Fonts } from '@/constants/Colors';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { atom, useAtom } from 'jotai';

export type UnionSizes = 'S' | 'M' | 'L';

export type SizeItemData = {
  size: UnionSizes;
};
const DATA: SizeItemData[] = [{ size: 'S' }, { size: 'M' }, { size: 'L' }];
export const initSize = atom<UnionSizes>('M');

export const SizeTabBar = () => {
  const [selectedSize, setSelectedSize] = useAtom<UnionSizes>(initSize);

  const handleSelectSize = ({ size }: { size: UnionSizes }) => {
    if (DATA.filter((el) => size === el.size)) {
      setSelectedSize(size);
    }
  };
  return (
    <View style={styles.sizeWrapper}>
      {DATA.map((el) => (
        <Pressable
          key={el.size}
          onPress={() => handleSelectSize(el)}
          style={[
            styles.size,
            {
              backgroundColor: selectedSize === el.size ? Colors.accentBrownClear : Colors.white,
            },
            {
              borderColor: selectedSize === el.size ? Colors.accentBrown : Colors.borderColor,
            },
          ]}
        >
          <Text
            style={[
              styles.sizeText,
              { color: selectedSize === el.size ? Colors.accentBrown : Colors.darkText },
            ]}
          >
            {el.size}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  sizeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  size: {
    width: 96,
    height: 43,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.darkText,
    textAlign: 'center',
  },
});
