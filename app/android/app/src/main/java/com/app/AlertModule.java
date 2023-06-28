package com.app;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.widget.Toast;


public class AlertModule extends ReactContextBaseJavaModule {
    AlertModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AlertModule";
    }

    @ReactMethod
    public void isUsable(Promise promise) {
        promise.resolve(true);
    }

    @ReactMethod
    public void showToast(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

}
