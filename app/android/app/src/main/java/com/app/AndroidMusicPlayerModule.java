package com.app;

import android.media.MediaPlayer;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;
import android.util.Log;


public class AndroidMusicPlayerModule extends ReactContextBaseJavaModule {
    private MediaPlayer mediaPlayer;

    public AndroidMusicPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidMusicPlayerModule";
    }

    @ReactMethod
    public void isUsable(Promise promise) {
        promise.resolve(true);
    }

    // TODO: Later I want to bundle the sounds with the app and then pass in a type to
    // the play sound which would then call a specific file.
    @ReactMethod
    public void playSound(String url, Promise promise) {
        try {
            if (mediaPlayer != null) {
                if (mediaPlayer.isPlaying()) {
                    mediaPlayer.stop();
                    mediaPlayer.release();
                }
                mediaPlayer = null;
            }

            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepare();
            mediaPlayer.start();
            promise.resolve(true);

        } catch (Exception e) {
            Log.d("AndroidMusicPlayer", "An error occurred" + e.toString());
            promise.resolve(false);
        }
    }
}
