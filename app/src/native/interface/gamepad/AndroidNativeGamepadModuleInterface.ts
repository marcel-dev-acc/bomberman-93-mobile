import { NativeModules, NativeEventEmitter } from 'react-native';

export const isGamepadModuleAvailable = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidGamepadModule &&
      NativeModules.AndroidGamepadModule.isUsable
    ) {
      const isAvailable: boolean = await NativeModules.AndroidGamepadModule.isUsable();
      return isAvailable;
    }
    console.info('[isGamepadModuleAvailable] AndroidGamepadModule NOT enabled');
  } catch (err: any) {
    console.error('[isGamepadModuleAvailable] AndroidGamepadModule has NOT loaded, Error:', err);
  }
  return false;
};

export const getGamepadEventEmitter = () => {
  return new NativeEventEmitter(NativeModules.AndroidGamepadModule);
};

export const registerGamepadKeyListener = (callback: any) => {
  const GamepadEventEmitter = getGamepadEventEmitter();
  return GamepadEventEmitter.addListener('onGamepadKeyEvent', callback);
};
