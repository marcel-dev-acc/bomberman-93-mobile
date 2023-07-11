import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
  profiles = 'profiles',
  token = 'token',
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (err: any) {
    console.warn(`Failed to store ${key}`);
  }
};

export const fetchData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(`@${key}`);
  } catch (err: any) {
    console.warn(`Failed to fetch ${key}`);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (err: any) {
    console.warn(`Failed to remove ${key}`);
  }
};