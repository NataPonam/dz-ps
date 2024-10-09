import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import { router } from 'expo-router';
import { Colors, Fonts } from '@/constants/Colors';
import { initSize, UnionSizes } from '@/entities/card/ui/widgets/SizeTabBar';
import { selectedCoffeAtom, selectedCoffeListAtom } from '../../[alias]';
import { ButtonComponent } from '@/shared/ButtonComponent/ButtonComponent';
import OrderDeliveryAddress from '@/entities/order/OrderDeliveryAddress';
import axios, { AxiosError } from 'axios';
import { getAddress } from '@/entities/address/address.state';
import OrderList from '@/entities/order/OrderList';
import { currencyFormat } from '@/assets/utils/currencyFormat';
import { ModalComponent } from '@/shared/Modal/ModalComponent';

export interface OrderRequest {
  address: string;
  orderItems: [
    {
      id: number | undefined;
      size: UnionSizes;
      quantity: number | undefined;
    },
  ];
}

export default function Cart() {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [addressLocation] = useAtom(getAddress);
  const [selectedSize] = useAtom<UnionSizes>(initSize);
  const [selectedCoffee] = useAtom(selectedCoffeAtom);
  const [selectedCoffeeList, setSelectedCoffeeList] = useAtom(selectedCoffeListAtom);
  const delivetyPrice = 100;
  const commonPrice = selectedCoffeeList
    .map((el) => {
      const priceWithSize = el.size === 'S' ? -30 : el.size === 'L' ? 30 : 0;
      return (el.item.price + priceWithSize) * el.quantity;
    })
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  const newOrder: OrderRequest = {
    address: addressLocation,
    orderItems: [
      { id: selectedCoffee?.item.id, size: selectedSize, quantity: selectedCoffee?.quantity },
    ],
  };
  const makeOrder = async () => {
    if (!addressLocation) {
      return setVisibleModal(true);
    }
    try {
      const response = await axios.post(`https://purpleschool.ru/coffee-api/order`, newOrder);
      if (response.data.success) {
        router.replace('/(app)/(tabs)/cart/success');
        setSelectedCoffeeList([]);
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        router.replace('/(app)/(tabs)/cart/error');
      }
    }
  };

  return (
    <View style={styles.container}>
      <OrderDeliveryAddress />
      <ModalComponent
        visible={visibleModal}
        setVisible={setVisibleModal}
        text="Необходимо заполнить адрес доставки!"
        buttonText="Хорошо"
      />

      <View style={styles.orderList}>
        <View style={styles.line}></View>
        {selectedCoffeeList.length ? (
          <>
            <OrderList />
            <View style={styles.line}></View>
            <View style={styles.finalPriceWrapper}>
              <Text style={styles.orderTitle}>Итог</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.priceText}>Цена</Text>
                <Text style={styles.priceNum}>{currencyFormat(commonPrice)}</Text>
              </View>
              <View style={styles.priceWrapper}>
                <Text style={styles.priceText}>Доставка</Text>
                <Text style={styles.priceNum}>{currencyFormat(delivetyPrice)}</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.priceWrapper}>
                <Text style={styles.priceText}>Итого к оплате</Text>
                <Text style={styles.priceNum}>{currencyFormat(commonPrice + delivetyPrice)}</Text>
              </View>
            </View>
            <ButtonComponent text="Заказать" onPress={makeOrder} />
          </>
        ) : (
          <ButtonComponent
            text="Выбрать напиток"
            onPress={() => router.push('/(app)/(tabs)/catalog')}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  orderList: {
    gap: 10,
    width: '100%',
  },
  orderTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    lineHeight: 16,
    color: Colors.darkText,
    marginBottom: 4,
  },
  finalPriceWrapper: {
    gap: 16,
  },
  priceText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: Colors.darkText,
  },
  priceNum: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 16,
    color: Colors.darkText,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
