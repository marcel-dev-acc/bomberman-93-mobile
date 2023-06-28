package com.app;

import android.content.Context;
import android.hardware.input.InputManager;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.os.Build;
import android.view.InputDevice;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.HashMap;
import java.util.Map;

public class AndroidUsbModule extends ReactContextBaseJavaModule {

    private InputManager inputManager;
    private InputManager.InputDeviceListener inputDeviceListener;

    public AndroidUsbModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidUsbModule";
    }

    @ReactMethod
    public void isUsable(Promise promise) {
        promise.resolve(true);
    }

    @ReactMethod
    public void listUsbDevices(com.facebook.react.bridge.Promise promise) {
        Context context = getReactApplicationContext();
        UsbManager usbManager = (UsbManager) context.getSystemService(Context.USB_SERVICE);

        WritableArray deviceList = new WritableNativeArray();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
            HashMap<String, UsbDevice> usbDevices = usbManager.getDeviceList();

            for (Map.Entry<String, UsbDevice> entry : usbDevices.entrySet()) {
                UsbDevice device = entry.getValue();
                WritableMap deviceInfo = new WritableNativeMap();
                deviceInfo.putString("deviceName", device.getDeviceName());
                deviceInfo.putString("productName", device.getProductName());
                deviceInfo.putString("manufacturerName", device.getManufacturerName());
                deviceList.pushMap(deviceInfo);
            }
        }

        promise.resolve(deviceList);
    }

}
