package ru.fedosov.opengifityhack.ui.presenter;

import com.arellomobile.mvp.InjectViewState;

import java.util.concurrent.TimeUnit;

import ru.fedosov.opengifityhack.client.RestClient;
import ru.fedosov.opengifityhack.client.User;
import ru.fedosov.opengifityhack.ui.view.GuestLoginView;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * Created by Максим on 16.09.2017.
 */
@InjectViewState
public class GuestLoginPresenter {
    private GuestLoginView mGuestLoginView;

    public GuestLoginPresenter(GuestLoginView loginView) {
        this.mGuestLoginView = loginView;
    }

    public void guestLogin(String name, String age, String imei) {
        RestClient.getInstance().guestLogin(name, age, imei)
                .subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Subscriber<User>() {
                    @Override
                    public void onCompleted() {

                    }

                    @Override
                    public void onError(Throwable e) {
                        mGuestLoginView.showError(e.getMessage());
                    }

                    @Override
                    public void onNext(User user) {
                        mGuestLoginView.onGuestLoginResult(user!=null);
                    }
                });
    }
}
