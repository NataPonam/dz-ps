import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Colors, Fonts } from '@/constants/Colors';

export type ModalType = {
  visible: boolean;
  setVisible: (prev: boolean) => void;
  text: string;
  buttonText: string;
  descr?: string;
};
export function ModalComponent({ visible, setVisible, text, buttonText, descr }: ModalType) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          {descr && <Text style={styles.modalText}>{descr}</Text>}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.accentBrown,
    marginTop: 15,
  },
  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});
