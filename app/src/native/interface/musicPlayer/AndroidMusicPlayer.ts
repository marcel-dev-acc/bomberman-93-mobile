import {NativeModules} from 'react-native';

export const isMusicPlayerModuleAvailable = async (): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidMusicPlayerModule &&
      NativeModules.AndroidMusicPlayerModule.isUsable
    ) {
      const isAvailable: boolean =
        await NativeModules.AndroidMusicPlayerModule.isUsable();
      return isAvailable;
    }
    console.info(
      '[isMusicPlayerModuleAvailable] AndroidMusicPlayerModule NOT enabled',
    );
  } catch (err: any) {
    console.error(
      '[isMusicPlayerModuleAvailable] AndroidMusicPlayerModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};

export const playSound = async (track: string): Promise<boolean> => {
  try {
    if (
      NativeModules.AndroidMusicPlayerModule &&
      NativeModules.AndroidMusicPlayerModule.playSound
    ) {
      const isPlaying: boolean =
        await NativeModules.AndroidMusicPlayerModule.playSound(track);
      return isPlaying;
    }
    console.info('[playSound] AndroidMusicPlayerModule NOT enabled');
  } catch (err: any) {
    console.error(
      '[playSound] AndroidMusicPlayerModule has NOT loaded, Error:',
      err,
    );
  }
  return false;
};
