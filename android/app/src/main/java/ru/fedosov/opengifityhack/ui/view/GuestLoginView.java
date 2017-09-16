package ru.fedosov.opengifityhack.ui.view;

import com.arellomobile.mvp.MvpView;
import com.arellomobile.mvp.viewstate.strategy.AddToEndStrategy;

/**
 * Created by Максим on 16.09.2017.
 */
public interface GuestLoginView  {
    public void onGuestLoginResult(boolean success);

    void showError(String message);
}
