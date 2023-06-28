package com.app;

import android.util.Log;
import android.view.InputDevice;
import android.view.KeyEvent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AndroidGamepadModule extends ReactContextBaseJavaModule {

    private DeviceEventManagerModule.RCTDeviceEventEmitter mEmitter = null;

    public AndroidGamepadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidGamepadModule";
    }

    @ReactMethod
    public void isUsable(Promise promise) {
        promise.resolve(true);
    }

    public void dispatchKeyEvent(KeyEvent event) {
        // Emit key event to React Native
        WritableMap eventDetails = Arguments.createMap();
        eventDetails.putInt("deviceId", event.getDeviceId());
        eventDetails.putInt("source", event.getSource());
        eventDetails.putInt("action", event.getAction());
        eventDetails.putInt("keyCode", event.getKeyCode());
        sendEvent("onGamepadKeyEvent", eventDetails);
    }

    public void sendEvent(String eventName, WritableMap event) {
        Log.d("androidGamepadModule", event.toString());
        if (mEmitter == null) {
            mEmitter = getReactApplicationContext().getJSModule((DeviceEventManagerModule.RCTDeviceEventEmitter.class));
        } else {
            mEmitter.emit(eventName, event);
        }
    }
}
