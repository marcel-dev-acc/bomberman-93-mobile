import {NativeModules} from 'react-native'

export const isAlertModuleAvailable = async (): Promise<boolean> => {
  try {
    if (NativeModules.AlertModule && NativeModules.AlertModule.isUsable) {
      const isAvailable: boolean = await NativeModules.AlertModule.isUsable()
      return isAvailable
    }
    console.info('[isAlertModuleAvailable] AlertModule NOT enabled')
  } catch (err: any) {
    console.error(
      '[isAlertModuleAvailable] AlertModule has NOT loaded, Error:',
      err,
    )
  }
  return false
}

export const createAlert = async (message: string): Promise<boolean> => {
  try {
    if (NativeModules.AlertModule && NativeModules.AlertModule.showToast) {
      const isAvailable: boolean = await NativeModules.AlertModule.showToast(
        message,
      )
      return isAvailable
    }
    console.info('[createAlert] AlertModule NOT enabled')
  } catch (err: any) {
    console.error('[createAlert] AlertModule has NOT loaded, Error:', err)
  }
  return false
}
