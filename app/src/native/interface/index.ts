export type {Device as Device} from './bluetooth/types';
export {isBluetoothModuleAvailable as isBluetoothModuleAvailableOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';
export {isBluetoothEnabled as isBluetoothEnabledOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';
export {isBluetoothOn as isBluetoothOnOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';
export {hasBluetoothPermission as hasBluetoothPermissionOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';
export {listConnectedBluetoothDevices as listConnectedBluetoothDevicesOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';
export {listDeviceServices as listDeviceServicesOnAndroid} from './bluetooth/AndroidNativeBluetoothModuleInterface';

export {isGamepadModuleAvailable as isGamepadModuleAvailableOnAndroid} from './gamepad/AndroidNativeGamepadModuleInterface';
export {getGamepadEventEmitter as getGamepadEventEmitterOnAndroid} from './gamepad/AndroidNativeGamepadModuleInterface';
export type {Event as AndroidGamepadEvent} from './gamepad/types';

export {isAlertModuleAvailable as isAlertModuleAvailableOnAndroid} from './alert/AndroidAlert';
export {createAlert as createAlertOnAndroid} from './alert/AndroidAlert';

export {isMusicPlayerModuleAvailable as isMusicPlayerModuleAvailableOnAndroid} from './musicPlayer/AndroidMusicPlayer';
export {playSound as playSoundOnAndroid} from './musicPlayer/AndroidMusicPlayer';
