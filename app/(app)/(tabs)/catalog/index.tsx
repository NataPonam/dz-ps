import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { View, StyleSheet } from 'react-native';
import AddressLine from '@/shared/AddressLine/AddressLine';
import ButtonBar from '@/shared/ButtonComponent/buttonBar/ButtonBar';
import SearchInput from '@/shared/SearchInput/SearchInput';
import CardList from '@/entities/card/ui/CardList';
import { UnionKeys } from '@/shared/ButtonComponent/buttonBar/ButtonBar.type';
import { useAtom } from 'jotai';
import { activeModalAtom } from '../cart/success';
import { ModalComponent } from '@/shared/Modal/ModalComponent';

export default function Catalog() {
  const [text, onChangeText] = useState<string>('');
  const [activeKey, setActiveKey] = useState<UnionKeys>('Все');
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useAtom(activeModalAtom);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AddressLine />
        <SearchInput text={text} onChangeText={(value) => onChangeText(value)} />
      </View>

      <View style={styles.body}>
        <ButtonBar
          inputText={text}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          setIsFilter={setIsFilter}
          isFilter={isFilter}
        />
        <CardList
          inputText={text}
          onChangeText={onChangeText}
          activeKey={activeKey}
          isFilter={isFilter}
        />
      </View>

      <ModalComponent
        visible={activeModal}
        setVisible={setActiveModal}
        text="Ваш заказ готов!"
        descr="Курьер будет у Вас через 5 минут!"
        buttonText="Иду встречать курьера"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBG,
  },
  header: {
    backgroundColor: Colors.black,
    padding: 30,
  },
  body: {
    paddingTop: 28,
    backgroundColor: Colors.lightBG,
    width: '100%',
    gap: 24,
  },
});
