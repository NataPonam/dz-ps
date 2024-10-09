import { Colors, Fonts } from '@/constants/Colors';
import { Card } from '@/entities/card/model/card.model';
import { initSize, SizeTabBar, UnionSizes } from '@/entities/card/ui/widgets/SizeTabBar';
import { ButtonComponent } from '@/shared/ButtonComponent/ButtonComponent';
import axios, { AxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BigStarIcon from '@/assets/icons/BigStarIcon';
import { atom, useAtom } from 'jotai';
import { currencyFormat } from '@/assets/utils/currencyFormat';

export const selectedCoffeAtom = atom<SelectedCard>();
export const selectedCoffePriceAtom = atom<number>();
export const selectedCoffeListAtom = atom<SelectedCard[]>([]);
export interface SelectedCard {
  item: Card;
  quantity: number;
  size: string;
}
export default function CoffeeItem() {
  const [price, setPrice] = useAtom(selectedCoffePriceAtom);
  const [selectedCoffee, setSelectedCoffee] = useAtom(selectedCoffeAtom);
  const [selectedCoffeeList, setSelectedCoffeeList] = useAtom(selectedCoffeListAtom);
  const [selectedSize] = useAtom<UnionSizes>(initSize);
  const { alias } = useLocalSearchParams();

  useEffect(() => {
    try {
      axios.get(`https://purpleschool.ru/coffee-api/id/${alias}`).then((res) => {
        setSelectedCoffee({ item: res.data, quantity: 1, size: 'M' });
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }, []);
  useEffect(() => {
    if (selectedCoffee && selectedSize === 'S') {
      setPrice(selectedCoffee.item.price - 30);
    }
    if (selectedCoffee && selectedSize === 'L') {
      setPrice(selectedCoffee.item.price + 30);
    }
    if (selectedCoffee && selectedSize === 'M') {
      setPrice(selectedCoffee.item.price);
    }
  }, [selectedCoffee, selectedSize]);

  useEffect(() => {
    if (selectedCoffee) {
      if (selectedCoffee.size !== selectedSize) {
        setSelectedCoffee({ ...selectedCoffee, size: selectedSize });
      }
    }
  }, [selectedCoffee, selectedSize]);

  const addToCart = (item: SelectedCard | undefined) => {
    if (item) {
      if (!selectedCoffeeList.some((el) => el.item.id === item.item.id && el.size === item.size)) {
        setSelectedCoffeeList([...selectedCoffeeList, item]);
      } else {
        const newArr = selectedCoffeeList.map((el) => {
          if (el.item.id === item.item.id && el.size === item.size) {
            return { ...el, quantity: el.quantity + 1 };
          }
          return el;
        });
        if (newArr) {
          setSelectedCoffeeList(newArr);
        }
      }
    }
    router.dismiss();
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: selectedCoffee?.item.image }} />
        <View style={styles.textWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{selectedCoffee?.item.name}</Text>
            <Text style={styles.subTitle}>{selectedCoffee?.item.subTitle}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <BigStarIcon />
            <Text style={styles.ratingText}>{selectedCoffee?.item.rating}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View>
          <Text style={styles.descrTitle}>Описание</Text>
          <Text style={styles.description}>{selectedCoffee?.item.description}</Text>
        </View>
        <View>
          <Text style={styles.descrTitle}>Размер</Text>
          <SizeTabBar />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.priceTitle}>Цена</Text>
          <Text style={styles.priceText}>{currencyFormat(price ? price : 0)}</Text>
        </View>

        <ButtonComponent
          text="В корзину"
          onPress={() => addToCart(selectedCoffee)}
          style={styles.button}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    gap: 24,
    color: Colors.darkText,
  },

  image: {
    height: 226,
    minWidth: 315,
    borderRadius: 16,
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.semibold,
    lineHeight: 20,
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.lightText,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: Fonts.semibold,
    color: Colors.darkText,
  },
  descrTitle: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    paddingBottom: 12,
    lineHeight: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.lightText,
    lineHeight: 17,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 110,
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowColor,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  priceTitle: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: Fonts.regular,
    color: Colors.lightText,
    marginBottom: 8,
  },
  priceText: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    lineHeight: 23,
    color: Colors.accentBrown,
  },
  button: {
    minWidth: 217,
  },
});
