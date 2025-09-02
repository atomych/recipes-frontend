import { LocalStorageKeys } from '@/infrastructure/localstorage/consts.ts';

export default {
  getItem: (key: LocalStorageKeys) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  setItem: (key: LocalStorageKeys, value: string) => {
    try {
      return localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },
  clearItem: (key: LocalStorageKeys) => {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};
