package com.app;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "app";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
            // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
            DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
    );
  }

  private AndroidGamepadModule androidGamepadModule;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // We use this method as the JS thread might not be ready at
    // the same time as the UI thread
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        // Create an instance of ReactApplicationContext
        ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
        // Create an instance of AndroidGamepadModule
        androidGamepadModule = new AndroidGamepadModule((ReactApplicationContext) reactContext);
      }
    }, 5000);

    // After react is initialized; set our background color (override splash screen theme)
//    getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
//      @Override
//      public void onReactContextInitialized(ReactContext context) {
//        // Hide the native splash screen
//        Log.d("LPD", "called!");
//        getWindow().getDecorView().setBackgroundColor(Color.WHITE);
//      }
//    });
  }

  // Override the dispatchKeyEvent method
  @Override
  public boolean dispatchKeyEvent(KeyEvent event) {

    // Call the dispatchKeyEvent method of the AndroidGamepadModule instance
    androidGamepadModule.dispatchKeyEvent(event);

    // Call the super method to allow other key event handling
    return super.dispatchKeyEvent(event);
  }
}
