package ru.fedosov.opengifityhack;

import android.app.Application;

import ru.fedosov.opengifityhack.utils.PrefUtils;

public class FinApp extends Application {
    private static FinApp sInstance;
    private static boolean preJellyBean;

    public static FinApp getInstance() {
        return sInstance;
    }

    public static boolean isPreJellyBean() {
        return preJellyBean;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if (sInstance == null) sInstance = this;
        PrefUtils.init(getBaseContext());
    }

}