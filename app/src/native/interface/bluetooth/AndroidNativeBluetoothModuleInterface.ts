import {NativeModules} from 'react-native';
import {Device} from './types';

export const isBluetoothModuleAvailable = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.isUsable
    ) {
      const isAvailable: boolean =
        await NativeModules.AndroidBluetoothModule.isUsable();
      return isAvailable;
    }
    console.warn(
      '[isBluetoothModuleAvailable] AndroidBluetoothModule NOT enabled',
    );
  } catch (err: any) {
    console.error(
      '[isBluetoothModuleAvailable] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};

export const isBluetoothEnabled = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.isBluetoothEnabled
    ) {
      const isEnabled: boolean =
        await NativeModules.AndroidBluetoothModule.isBluetoothEnabled();
      return isEnabled;
    }
    console.warn('[isBluetoothEnabled] AndroidBluetoothModule NOT enabled');
  } catch (err: any) {
    console.error(
      '[isBluetoothEnabled] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};

export const isBluetoothOn = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.isBluetoothOn
    ) {
      const isOn: boolean =
        await NativeModules.AndroidBluetoothModule.isBluetoothOn();
      return isOn;
    }
    console.warn('[isBluetoothEnabled] AndroidBluetoothModule NOT enabled');
  } catch (err: any) {
    console.error(
      '[isBluetoothEnabled] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};

export const hasBluetoothPermission = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.checkBluetoothConnectPermission
    ) {
      const hasPermission: boolean =
        await NativeModules.AndroidBluetoothModule.checkBluetoothConnectPermission();
      return hasPermission;
    }
    console.warn('[hasBluetoothPermission] AndroidBluetoothModule NOT enabled');
  } catch (err: any) {
    console.error(
      '[hasBluetoothPermission] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};

export const listConnectedBluetoothDevices = async (): Promise<Device[]> => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.listBluetoothDevices
    ) {
      const devices: any[][] =
        await NativeModules.AndroidBluetoothModule.listBluetoothDevices();
      if (devices === null) {
        console.warn(
          '[listConnectedBluetoothDevices] Bluetooth permission not granted',
        );
        return [] as Device[];
      }
      return devices.map(device => {
        return {
          name: device[0] as string,
          address: device[1] as string,
        };
      });
    }
    console.warn(
      '[listConnectedBluetoothDevices] AndroidBluetoothModule NOT enabled',
    );
  } catch (err: any) {
    console.error(
      '[listConnectedBluetoothDevices] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return [] as Device[];
};

export const listDeviceServices = async (address: string) => {
  try {
    if (
      NativeModules.AndroidBluetoothModule &&
      NativeModules.AndroidBluetoothModule.listDeviceServices
    ) {
      const services: any[][] =
        await NativeModules.AndroidBluetoothModule.listBluetoothDevices(
          address,
        );
      if (services === null) {
        console.warn('[listDeviceServices] Bluetooth permission not granted');
        return [] as any[];
      }
      return services;
    }
    console.warn('[listDeviceServices] AndroidBluetoothModule NOT enabled');
  } catch (err: any) {
    console.error(
      '[listDeviceServices] AndroidBluetoothModule has NOT loaded, Error:',
      err,
    );
  }
  return [] as any[];
};
