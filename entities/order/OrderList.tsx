import React from 'react';
import { View, StyleSheet, FlatList, Image, Text, Pressable } from 'react-native';
import { useAtom } from 'jotai';
import { SelectedCard, selectedCoffeListAtom } from '@/app/(app)/[alias]';
import { Colors, Fonts } from '@/constants/Colors';

export default function OrderList() {
  const [selectedCoffeeList, setSelectedCoffeeList] = useAtom(selectedCoffeListAtom);

  const renderCard = ({ item }: { item: SelectedCard }) => {
    const addQuantity = (item: SelectedCard) => {
      setSelectedCoffeeList(
        selectedCoffeeList.map((el) =>
          el.item.id === item.item.id && el.size == item.size
            ? { ...el, quantity: el.quantity + 1 }
            : el,
        ),
      );
    };
    const deleteQuantity = (item: SelectedCard) => {
      setSelectedCoffeeList(
        selectedCoffeeList
          .map((el) =>
            el.item.id === item.item.id && el.size == item.size
              ? { ...el, quantity: el.quantity - 1 }
              : el,
          )
          .filter((el) => {
            return el.item.id === item.item.id ? el.quantity > 0 : true;
          }),
      );
    };

    const priceWithSize = item.size === 'S' ? -30 : item.size === 'L' ? 30 : 0;

    const priceItem = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format((item.item.price + priceWithSize) * item.quantity);

    return (
      <View style={styles.orderWrapper}>
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: item?.item.image }} />
          <View>
            <Text style={styles.orderTitle}>{item?.item.name}</Text>
            <Text style={styles.orderDescr}>
              {item?.item.subTitle} / {item.size}
            </Text>
          </View>
        </View>

        <Text style={styles.price}>{priceItem}</Text>

        <View style={styles.changeNumberButton}>
          <Pressable onPress={() => deleteQuantity(item)} style={styles.numberButton}>
            <Text style={styles.textNumberButton}>–</Text>
          </Pressable>
          <Text style={styles.coffeeCount}>{item.quantity}</Text>
          <Pressable onPress={() => addQuantity(item)} style={styles.numberButton}>
            <Text style={styles.textNumberButton}>+</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={selectedCoffeeList}
        keyExtractor={(item) => item.item.id.toString() + item.size}
        renderItem={renderCard}
        extraData={renderCard}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  list: {
    maxHeight: 215,
  },

  orderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    marginRight: 5,
  },
  orderTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    lineHeight: 16,
    color: Colors.darkText,
    marginBottom: 2,
  },
  orderDescr: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 13,
    color: Colors.lightText,
    maxWidth: 100,
  },
  price: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 'auto',
    marginRight: 5,
  },
  changeNumberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  numberButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    color: Colors.darkText,
  },
  textNumberButton: {
    color: Colors.darkText,
    fontSize: 16,
    textAlign: 'center',
  },
  coffeeCount: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    fontStyle: 'normal',
    lineHeight: 14,
    color: Colors.darkText,
  },
});
