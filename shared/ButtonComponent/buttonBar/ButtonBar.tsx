import React, { useEffect } from 'react';
import { Colors, Fonts } from '@/constants/Colors';
import { Pressable, Text, StyleSheet, FlatList, View } from 'react-native';
import { DATA, UnionKeys } from './ButtonBar.type';

export default function ButtonBar({
  activeKey,
  setActiveKey,
  inputText,
  isFilter,
  setIsFilter,
}: {
  activeKey: string;
  setActiveKey: (prev: UnionKeys) => void;
  isFilter: boolean;
  setIsFilter: (prev: boolean) => void;
  inputText: string;
}) {
  const buttonPressed = ({ key }: { key: UnionKeys }) => {
    if (DATA.filter((el) => key === el.key)) {
      setActiveKey(key);
      setIsFilter(true);
    }
  };
  useEffect(() => {
    if (inputText !== '') {
      setIsFilter(false);
      const newItem = DATA.find((item) => {
        return item.key.toLowerCase().includes(inputText);
      });
      if (newItem !== undefined) {
        setActiveKey(newItem.key);
      }
    }
  }, [inputText]);
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={DATA}
        extraData={activeKey}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => buttonPressed(item)}>
            <Text
              style={{
                ...styles.item,
                backgroundColor:
                  activeKey === item.key && isFilter ? Colors.accentBrown : Colors.white,
                color: activeKey === item.key && isFilter ? Colors.white : Colors.accentGreen,
              }}
            >
              {item.key}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
  },
  item: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 12,
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: Fonts.regular,
    marginRight: 8,
  },
});
