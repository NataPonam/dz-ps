import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storageAddress = createJSONStorage<string>(() => AsyncStorage);

const INITIAL_STATE: string = '';

export const addressStorageAtom = atomWithStorage<string>('address', INITIAL_STATE, storageAddress);

export const addressInfoStorageAtom = atomWithStorage<string>(
  'addressInfo',
  INITIAL_STATE,
  storageAddress,
);

export const getAddress = atom(
  async (get) => get(addressStorageAtom),

  async (get, set, string: string) => {
    set(addressStorageAtom, string);
  },
);

export const getAddressInfo = atom(
  async (get) => get(addressInfoStorageAtom),

  async (get, set, string: string) => {
    set(addressInfoStorageAtom, string);
  },
);
