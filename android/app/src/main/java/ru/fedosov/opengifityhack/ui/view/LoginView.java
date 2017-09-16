package ru.fedosov.opengifityhack.ui.view;

import com.arellomobile.mvp.MvpView;

/**
 * Created by Максим on 16.09.2017.
 */

public interface LoginView extends MvpView {
    public void onLoginResult(boolean success);
}
